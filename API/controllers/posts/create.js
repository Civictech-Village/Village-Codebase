const createPost = async (req, res) => {
  console.log("reached the create function for posts");
  const {
    db: { Posts },
    body: { user_id, username, issue_id, message, image },
  } = req;
  const post = await Posts.create(user_id, username, issue_id, message, image);
  res.send(post);
};

module.exports = createPost;
