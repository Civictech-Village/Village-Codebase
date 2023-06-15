const listPostsVillage = async (req, res) => {
    const {
      db: { Posts },
      params: { id },
    } = req;
    const parties = await Posts.listVillages(id);
    res.send(parties);
  };
  
  module.exports = listPostsVillage;
  