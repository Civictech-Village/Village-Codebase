const listPostsVillage = async (req, res) => {
    const {
      db: { Posts },
      params: { id },
    } = req;
    const parties = await Posts.listVillages(id);
    console.log(parties)
    res.send(parties);
  };
  
  module.exports = listPostsVillage;
  