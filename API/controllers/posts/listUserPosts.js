const listUsersPosts = async (req, res) => {
    console.log("reached the create function for posts");
    const {
      db: { Posts },
      params: {id},
    } = req;
    const posts = await Posts.listUsersPosts(id);
    res.send(posts);
  };
  
  module.exports = listUsersPosts;
  