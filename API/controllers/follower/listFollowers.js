const listFollowers = async (req, res) => {
    const {
      db: { Followers },
      params: { id },
    } = req;
    const Follower = await Followers.countFollowers(id);
    res.send(Follower[0]);
  };
  
  module.exports = listFollowers;
  