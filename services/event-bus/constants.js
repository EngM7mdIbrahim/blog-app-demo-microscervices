const BASE_URL = `http://localhost:`;

const SERVICES_BASE_URL = {
  POSTS: 'http://posts-clusterip-srv:',
  COMMENTS: 'http://comments-clusterip-srv:',
  QUERY: 'http://query-clusterip-srv:',
  MODERTION: 'http://moderation-clusterip-srv:',
  EVENTS: 'http://event-bus-clusterip-srv:',
};

const EVENTS = {
  POST_CREATED: "PostCreated",
  COMMENT_CREATED: "CommentCreated",
  COMMENT_MODERATED: "CommentModerated",
  COMMENT_UPDATED: "CommentUpdated",
};

const CONFIRM_RES = constructEvent("ConfirmMessage", {});
const COMMENT_STATUS = {
  PENDING: "Pending",
  APPROVED: "Approved",
  REJECTED: "Rejected",
};

const SERVICES = {
  POSTS: 4000,
  COMMENTS: 4001,
  QUERY: 4002,
  MODERTION: 4003,
  EVENTS: 4005,
};
function getHost(port) {
  //Finding the key
  let KEY = 'EVENTS';
  for(const key in SERVICES){
    if(port === SERVICES[key]){
      KEY = key;
      break;
    }
  }
  return SERVICES_BASE_URL[KEY] + port;
}

function constructEvent(type, data) {
  return { type, data };
}

module.exports = {
  SERVICES,
  getHost,
  constructEvent,
  EVENTS,
  CONFIRM_RES,
  COMMENT_STATUS,
};
