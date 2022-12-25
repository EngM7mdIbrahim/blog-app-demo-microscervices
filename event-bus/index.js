const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { getHost, SERVICES, CONFIRM_RES } = require("../constants");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/events", async (req, res) => {
  const event = req.body;
  console.log("Recievd an event", event);
  console.log("Spreading the event action ...");
  try {
    await axios.post(getHost(SERVICES.POSTS) + "/events", event);
    await axios.post(getHost(SERVICES.COMMENTS) + "/events", event);
    await axios.post(getHost(SERVICES.QUERY) + "/events", event);
  } catch (e) {
    console.log("Error has occurred", e);
  }

  res.send(CONFIRM_RES);
});

app.listen(SERVICES.EVENTS, () => {
  console.log(`Events Service listenning on port ${SERVICES.EVENTS} ...`);
});
