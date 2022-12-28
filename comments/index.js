const express = require("express");
const crypto = require("crypto");
const cors = require("cors");
const axios = require("axios");
const { SERVICES, EVENTS, CONFIRM_RES, getHost, constructEvent } = require("../constants");

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
  console.log('Recieved a comment creation request for the post:', postID)
  const comments = commentsByPostID[postID] || [];
  const { content, writer, postedOn, img } = req.body;
  const comment = { content, writer, postedOn, img }
  comments.push({ id: crypto.randomUUID(), ...comment });
  commentsByPostID[postID] = comments;
  console.log('Comment is:', commentsByPostID[postID]);
  try{
    await axios.post(
      getHost(SERVICES.EVENTS) + "/events/",
      constructEvent(EVENTS.COMMENT_CREATED, {
        ...comment,
        postID,
      })
    );
  }catch (e) {
    console.log('Error has occurred', e)
  }

  res.status(201).send(comments);
});

app.post('/events', (req,res)=>{
  res.send(CONFIRM_RES);
})

app.listen(SERVICES.COMMENTS, () => {
  console.log(`Comments Service listenning on port ${SERVICES.COMMENTS} ...`);
});
