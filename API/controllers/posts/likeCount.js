const likeCount = async (req, res) => {
    console.log("reached the likeCount function for posts");
    const {
      db: { Posts },
      params: {id},
    } = req;
    const post = await Posts.likeCount(id);
    res.send(post);
  };
  
  module.exports = likeCount;
  