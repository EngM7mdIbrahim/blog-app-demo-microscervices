const BASE_URL = `http://localhost:`;

const EVENTS = {
  POST_CREATED: "PostCreated",
  COMMENT_CREATED: "CommentCreated",
};

const SERVICES = {
  POSTS: 4000,
  COMMENTS: 4001,

  EVENTS: 4005,
};
function getHost(port) {
  return BASE_URL + port;
}

function constructEvent(type, data) {
  return { type, date };
}

module.exports = { SERVICES, getHost, constructEvent, EVENTS };
