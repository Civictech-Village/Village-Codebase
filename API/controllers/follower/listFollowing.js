const listFollowing = async (req, res) => {
  const {
    db: { Followers },
    params: { id },
  } = req;
  const Follower = await Followers.countFollowing(id);
  res.send(Follower[0]);
};

module.exports = listFollowing;
