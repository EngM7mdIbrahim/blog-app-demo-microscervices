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
  [EVENTS.COMMENT_CREATED]: handleCommentEvent,
};

const app = express();

app.use(express.json());
app.use(cors());

app.post("/events", (req, res) => {
  const event = req.body;
  try {
    EVENS_HANDLER[event.type](event, res);
  } catch (e) {
    console.log('Error occurre:',e)
    res.send(CONFIRM_RES);
  }
});

app.get("/posts", (_, res) => {
  res.send(posts);
});

app.listen(SERVICES.QUERY, () => {
  console.log(`Query Service listenning on port ${SERVICES.QUERY} ...`);
});

//Event Handlers
function handleCommentEvent(event, res) {
  console.log(`Recieved ${event.type} event`);
  const { data } = event;
  const { postID, content, writer, postedOn } = data;
  console.log("Post ID:", postID);
  const comments = posts[postID].comments;
  comments.push({ content, writer, postedOn });
  console.log("Current Posts Obj: ", posts);
  res.send(CONFIRM_RES);
}

function handlePostEvent(event, res) {
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
  console.log("Current Posts Obj: ", posts);
  res.send(CONFIRM_RES);
}
