const isFollowing = async (req, res) => {
    const {
      session,
      db: { Followers },
      params: { id },
    } = req;
    const Follower = await Followers.isFollowing(session.userId, id);
    res.send(Follower);
  };
  
  module.exports = isFollowing;
  