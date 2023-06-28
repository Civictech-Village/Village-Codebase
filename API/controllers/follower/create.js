const followUser = async (req, res) => {
    const {
      session,
      db: { Followers },
      params: { id },
    } = req;
    const Follower = await Followers.createFollower(session.userId, id);
    res.send(Follower);
  };
  
  module.exports = followUser;
  