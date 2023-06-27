
const listPopular = async (req, res) => {
    const {
        session,
      db: { Posts },
    } = req;
    const parties = await Posts.listVillagePosts(session.userId);
    res.send(parties);
  };
  
  module.exports = listPopular;
  