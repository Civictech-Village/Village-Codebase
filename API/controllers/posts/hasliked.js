const likePost = async (req, res) => {
    console.log("reached the hasLiked function for posts");
    const {
      session,
      db: { Posts },
      params: {id},
    } = req;
    console.log(id)
    const post = await Posts.hasLiked(session.userId, id);
    res.send(post);
  };
  
  module.exports = likePost;
  