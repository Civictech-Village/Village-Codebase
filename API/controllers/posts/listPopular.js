
const listPopular = async (req, res) => {
    const {
      db: { Posts },
      query: {page, limit}
    } = req;
    const parties = await Posts.listPopularLiked(page, limit);
    res.send(parties);
  };
  
  module.exports = listPopular;
  