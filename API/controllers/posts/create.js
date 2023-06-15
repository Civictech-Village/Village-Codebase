const createPost = async (req, res) => {
  console.log("reached the create function for posts");
  const {
    session,
    db: { Posts },
    params: {id},
    body: { user_id, issue_id, message, image },
  } = req;
  const post = await Posts.create(session.userId, issue_id, id, message, image);
  res.send(post);
};

module.exports = createPost;
