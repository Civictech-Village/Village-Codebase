const likePost = async (req, res) => {
    console.log("reached the like function for posts");
    const {
      session,
      db: { Posts },
      params: {id},
    } = req;
    const post = await Posts.like(session.userId, id);
    res.send(post);
  };
  
  module.exports = likePost;
  