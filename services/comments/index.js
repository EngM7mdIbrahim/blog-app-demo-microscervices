const express = require("express");
const crypto = require("crypto");
const cors = require("cors");
const axios = require("axios");
const {
  SERVICES,
  EVENTS,
  CONFIRM_RES,
  getHost,
  constructEvent,
  COMMENT_STATUS,
} = require("./constants");

const app = express();

app.use(express.json());
app.use(cors());

const commentsByPostID = {
  "3cc7c75b-5460-4f9c-b8e4-8b8036d5a8c6": [
    {
      writer: "Mohamed Ibrahim",
      content: "Test comment",
      postedOn: new Date(),
    },
  ],
};

app.get("/posts/:id/comments", (req, res) => {
  const postID = req.params.id;
  const comments = commentsByPostID[postID] || [];
  res.status(200), send(comments);
});

app.post("/posts/:id/comments", async (req, res) => {
  const postID = req.params.id;
  console.log("Recieved a comment creation request for the post:", postID);
  const comments = commentsByPostID[postID] || [];
  const { content, writer, postedOn, img } = req.body;
  const comment = {
    content,
    writer,
    postedOn,
    img,
    status: COMMENT_STATUS.PENDING,
    id: crypto.randomUUID(),
  };
  comments.push(comment);
  commentsByPostID[postID] = comments;
  console.log("Comment is:", commentsByPostID[postID]);
  try {
    await axios.post(
      getHost(SERVICES.EVENTS) + "/events/",
      constructEvent(EVENTS.COMMENT_CREATED, {
        ...comment,
        postID,
      })
    );
  } catch (e) {
    console.log("Error has occurred", e);
  }

  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  console.log(
    "Recieved an event with the following details:",
    JSON.stringify(req.body)
  );
  const { type, data } = req.body;
  if (type === EVENTS.COMMENT_MODERATED) {
    const comments = commentsByPostID[data.postID];
    if (comments === undefined) {
      console.error(
        "Cannot find the post for the sent comment event. PostID:",
        data.postID,
        "and the comments database:",
        commentsByPostID
      );
      res.send(CONFIRM_RES);
      return;
    }
    const commentIndex = comments.findIndex(
      (comment) => comment.id === data.id
    );
    if (commentIndex === -1) {
      console.error(
        "Cannot find the sent comment event. CommentID:",
        data.id,
        "and the comments for this post:",
        comments
      );
      res.send(CONFIRM_RES);
      return;
    }
    comments[commentIndex] = { ...comments[commentIndex], status: data.status };
    console.log();
    console.log(
      "The resulted comment is:",
      JSON.stringify(comments[commentIndex])
    );
    console.log();
    console.log("The comments database is:", JSON.stringify(commentsByPostID));
    try {
      await axios.post(
        getHost(SERVICES.EVENTS) + "/events/",
        constructEvent(EVENTS.COMMENT_UPDATED, {
          ...comments[commentIndex],
          postID: data.postID,
        })
      );
    } catch (e) {
      console.error("Error occurred while sending comment updated event", e);
      res.send(CONFIRM_RES);
      return;
    }
  }
  res.send(CONFIRM_RES);
});

app.listen(SERVICES.COMMENTS, () => {
  console.log(`Comments Service listenning on port ${SERVICES.COMMENTS} ...`);
});
