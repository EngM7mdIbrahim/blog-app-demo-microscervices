const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { getHost, SERVICES, CONFIRM_RES, EVENTS } = require("../constants");

const posts = {
  "3cc7c75b-5460-4f9c-b8e4-8b8036d5a8c6": {
    writer: "Akuna Matata",
    content: "Hey there!",
    postedOn: new Date(),
    img: "images/avatar_0.png",
    id: "3cc7c75b-5460-4f9c-b8e4-8b8036d5a8c6",
    comments: [
      {
        writer: "Mohamed Ibrahim",
        content: "Test comment",
        postedOn: new Date(),
      },
    ],
  },
};

const EVENS_HANDLER = {
  [EVENTS.POST_CREATED]: handlePostEvent,
  [EVENTS.COMMENT_CREATED]: handleCreateCommentEvent,
  [EVENTS.COMMENT_UPDATED]: handleUpdateCommentEvent,
};

const app = express();

app.use(express.json());
app.use(cors());


app.post("/events", (req, res) => {
  const event = req.body;
  try {
    handleEvent(event)
    res.send(CONFIRM_RES);
  } catch (e) {
    console.log("Error occurre:", e);
    res.send(CONFIRM_RES);
  }
});

app.get("/posts", (_, res) => {
  res.send(posts);
});

app.listen(SERVICES.QUERY, async () => {
  console.log(`Query Service listenning on port ${SERVICES.QUERY} ...`);
  console.log('Checking for any missed events ...')
  const res = await axios.get(getHost(SERVICES.EVENTS)+'/events');
  const events = res.data;
  events.forEach(event =>{
    console.log('Processing Event:', event.type);
    handleEvent(event);
  })
  console.log('Syncing Events is complete.')
});

//Event Handlers
function handleEvent(event){
  const eventHandlerFunction = EVENS_HANDLER[event.type];
  if (eventHandlerFunction) {
    EVENS_HANDLER[event.type](event);
    console.log("Current Posts Obj: ", JSON.stringify(posts));
  }
}
function handleCreateCommentEvent(event) {
  console.log();
  console.log(`Recieved ${event.type} event:`, JSON.stringify(event));
  console.log();
  const { data } = event;
  const { postID} = data;
  const comment = {...data, postID: undefined}
  const comments = posts[postID].comments;
  comments.push(comment);
  console.log();
  console.log("Current comments:", comments);
  console.log();
}

function handlePostEvent(event) {
  console.log(`Recieved ${event.type} event`);
  const { data } = event;
  const { id, writer, content, postedOn, img } = data;
  posts[id] = {
    id,
    writer,
    content,
    postedOn,
    img,
    comments: [],
  };
}

function handleUpdateCommentEvent(event) {
  console.log();
  console.log(`Recieved ${event.type} event:`, JSON.stringify(event));
  console.log();
  const { data } = event;
  const { postID, id} = data;
  const comment = {...data, postID: undefined}
  const post = posts[postID];
  if (post === undefined) {
    console.error(
      "Cannot find the post for the sent comment event. PostID:",
      postID,
      "and the posts database:",
      JSON.stringify(posts)
    );
    return;
  }
  const comments = post.comments;
  const commentIndex = comments.findIndex((comment) => comment.id === id);
  if (commentIndex === -1) {
    console.error(
      "Cannot find the sent comment event. CommentID:",
      id,
      "and the comments for this post:",
      JSON.stringify(comments)
    );
    return;
  }
  comments[commentIndex] = comment;
  console.log();
  console.log("Current comments:", comments);
  console.log();
}
