const create = require('./create');
const destroy = require('./destroy');
const listByIssue = require('./listByIssue');
const update = require('./update');
const listAll = require('./listAllVillage')
const like = require('./like')
const likeCount = require('./likeCount')
const hasLiked = require('./hasliked')
const destroyLike = require('./destroyLikes')
const popularLikes = require('./listPopular')
const villagePosts = require('./listMyVillage')
const listUsersPosts = require('./listUserPosts')
module.exports = {
  create,
  destroy,
  listByIssue,
  update,
  listAll,
  like,
  likeCount,
  hasLiked,
  destroyLike,
  popularLikes,
  villagePosts,
  listUsersPosts
};
