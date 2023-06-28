const unFollow = async (req, res) => {
    const {
      session,
      db: { Followers },
      params: { id },
    } = req;
    const Follower = await Followers.unFollow(session.userId, id);
    res.send(Follower);
  };
  
  module.exports = unFollow;
  