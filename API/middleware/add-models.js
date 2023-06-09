const User = require('../db/models/user');
const Posts = require('../db/models/posts');
const Village = require('../db/models/village');
const Issues = require('../db/models/issues')
const Comments = require('../db/models/comments')
const Message = require('../db/models/message')
const Chatrooms = require('../db/models/chatroom')
const Followers = require('../db/models/followers')

const addModels = (req, res, next) => {
  req.db = {
    User,
    Posts,
    Village,
    Issues,
    Comments,
    Message,
    Chatrooms,
    Followers
  };
  next();
};

module.exports = addModels;
