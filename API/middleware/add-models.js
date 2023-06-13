const User = require('../db/models/user');
const Posts = require('../db/models/posts');
const Village = require('../db/models/village');

const addModels = (req, res, next) => {
  req.db = {
    User,
    Posts,
    Village
  };
  next();
};

module.exports = addModels;
