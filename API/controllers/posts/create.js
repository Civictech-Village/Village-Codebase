const createPost = async (req, res) => {
  const {
    db: { Posts },
    body: { user_id, username, issue_id, message, image },
  } = req;
  const post = await Posts.create(user_id, username, issue_id, message, image);
  res.send(post);
};

module.exports = createPost;
