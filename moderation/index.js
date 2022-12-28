const express = require("express");
const cors = require("cors");
const axios = require("axios");
const {
  getHost,
  SERVICES,
  CONFIRM_RES,
  EVENTS,
  COMMENT_STATUS,
  constructEvent,
} = require("../constants");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/events", async (req, res) => {
  console.log(
    "Recieved an event with the following details:",
    JSON.stringify(req.body)
  );
  const { type, data } = req.body;

  // Handling Comment Creation Event
  if (type === EVENTS.COMMENT_CREATED) {
    const status = data.content.toLowerCase().includes("orange")
      ? COMMENT_STATUS.REJECTED
      : COMMENT_STATUS.APPROVED;
    await axios.post(
      getHost(SERVICES.EVENTS) + "/events",
      constructEvent(EVENTS.COMMENT_MODERATED, {
        ...data,
        status,
      })
    );
  }

  res.send(CONFIRM_RES);
});

app.listen(SERVICES.MODERTION, () => {
  console.log(
    `Moderation Service listenning on port ${SERVICES.MODERTION} ...`
  );
});
