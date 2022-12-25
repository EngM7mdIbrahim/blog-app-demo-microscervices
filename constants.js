const BASE_URL = `http://localhost:`;

const EVENTS = {
  POST_CREATED: "PostCreated",
  COMMENT_CREATED: "CommentCreated",
};

const CONFIRM_RES = constructEvent('ConfirmMessage', {})

const SERVICES = {
  POSTS: 4000,
  COMMENTS: 4001,
  QUERY: 4002,
  EVENTS: 4005,
};
function getHost(port) {
  return BASE_URL + port;
}

function constructEvent(type, data) {
  return { type, data };
}

module.exports = { SERVICES, getHost, constructEvent, EVENTS, CONFIRM_RES };
