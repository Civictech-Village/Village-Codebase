const User = require('../db/models/user');
const Posts = require('../db/models/posts');
const Village = require('../db/models/village');
const Issues = require('../db/models/issues')
const Comments = require('../db/models/comments')

const addModels = (req, res, next) => {
  req.db = {
    User,
    Posts,
    Village,
    Issues,
    Comments
  };
  next();
};

module.exports = addModels;
