const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { getHost, SERVICES } = require('../constants')


const app = express();

app.use(express.json());
app.use(cors());

app.post("/events",async  (req, res) => {
  const { event } = req.body;

  await axios.post(getHost(SERVICES.POSTS)+'/events', event);
  await axios.post(getHost(SERVICES.COMMENTS)+'/events', event);
});


app.listen(4005, (req, res)=>{
  console.log('Events listenning on 4005 ...')
})