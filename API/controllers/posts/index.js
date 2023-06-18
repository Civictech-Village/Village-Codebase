const create = require('./create');
const destroy = require('./destroy');
const listByIssue = require('./listByIssue');
const update = require('./update');
const listAll = require('./listAllVillage')
const like = require('./like')
const likeCount = require('./likeCount')
const hasLiked = require('./hasliked')
const destroyLike = require('./destroyLikes')

module.exports = {
  create,
  destroy,
  listByIssue,
  update,
  listAll,
  like,
  likeCount,
  hasLiked,
  destroyLike
};
