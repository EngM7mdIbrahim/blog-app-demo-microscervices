const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { getHost, SERVICES, CONFIRM_RES } = require('../constants')


const app = express();

app.use(express.json());
app.use(cors());

app.post("/events",async  (req, res) => {
  const { event } = req.body;

  await axios.post(getHost(SERVICES.POSTS)+'/events', event);
  await axios.post(getHost(SERVICES.COMMENTS)+'/events', event);
  await axios.post(getHost(SERVICES.QUERY)+'/events', event);

  res.send(CONFIRM_RES)
});


app.listen(SERVICES.EVENTS, ()=>{
  console.log(`Events Service listenning on port ${SERVICES.EVENTS} ...`)
})