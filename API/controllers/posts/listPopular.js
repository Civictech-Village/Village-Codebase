
const listPopular = async (req, res) => {
    const {
      db: { Posts },
    } = req;
    const parties = await Posts.listPopularLiked();
    res.send(parties);
  };
  
  module.exports = listPopular;
  