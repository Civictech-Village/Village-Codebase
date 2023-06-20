const destroyLike = async (req, res) => {
    console.log("reached the destroyLike function for posts");
    const {
      session,
      db: { Posts },
      params: {id},
    } = req;
    console.log(id)
    const post = await Posts.destroyLike(session.userId, id);
    res.send(post);
  };
  
  module.exports = destroyLike;
  