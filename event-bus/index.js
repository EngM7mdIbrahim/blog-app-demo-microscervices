const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { getHost, SERVICES, CONFIRM_RES } = require("../constants");

const app = express();

app.use(express.json());
app.use(cors());

let events = [];

app.post("/events", async (req, res) => {
  const event = req.body;
  events.push(event);
  console.log("Recievd an event", event);
  console.log("Spreading the event action ...");
  try {
    await axios.post(getHost(SERVICES.POSTS) + "/events", event);
  } catch (e) {
    console.log(
      "POSTS SERVICE CONNECTION Error has occurred",
      e.syscall,
      e.code,
      e.address,
      ":",
      e.port
    );
  }
  try {
    await axios.post(getHost(SERVICES.COMMENTS) + "/events", event);
  } catch (e) {
    console.log(
      "COMMENTS SERVICE CONNECTION Error has occurred",
      e.syscall,
      e.code,
      e.address,
      ":",
      e.port
    );
  }
  try {
    await axios.post(getHost(SERVICES.QUERY) + "/events", event);
  } catch (e) {
    console.log(
      "QUERY SERVICE CONNECTION Error has occurred",
      e.syscall,
      e.code,
      e.address,
      ":",
      e.port
    );
  }
  try {
    await axios.post(getHost(SERVICES.MODERTION) + "/events", event);
  } catch (e) {
    console.log(
      "MODERTION SERVICE CONNECTION Error has occurred",
      e.syscall,
      e.code,
      e.address,
      ":",
      e.port
    );
  }

  res.send(CONFIRM_RES);
});
app.get("/events", (req, res) => {
  res.send(events);
});
app.listen(SERVICES.EVENTS, () => {
  console.log(`Events Service listenning on port ${SERVICES.EVENTS} ...`);
});
