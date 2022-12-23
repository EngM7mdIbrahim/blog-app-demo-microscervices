const express = require("express");
const crypto = require("crypto");
const cors = require("cors");
const axios = require("axios");
const { SERVICES, getHost, constructEvent, EVENTS } = require("../constants");
const app = express();

app.use(express.json());
app.use(cors());

const posts = {
  "3cc7c75b-5460-4f9c-b8e4-8b8036d5a8c6": {
    writer: "Akuna Matata",
    content: "Hey there!",
    postedOn: new Date(),
    img: "images/avatar_0.png",
    id: "3cc7c75b-5460-4f9c-b8e4-8b8036d5a8c6",
  },
};

app.get("/posts", (_, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  const id = crypto.randomUUID();
  const { writer, content, postedOn, img } = req.body;
  posts[id] = {
    id,
    writer,
    content,
    postedOn,
    img,
  };
  await axios(getHost(SERVICES.EVENTS), constructEvent(EVENTS.POST_CREATED, posts[id]));
  res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log("Posts Service listenning on 4000 ...");
});
