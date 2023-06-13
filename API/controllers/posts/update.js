const update = async (req, res) => {
  const {
    db: { Posts },
    params: { post_id },
    body: { image, message },
  } = req;
  const updatedPost = await Posts.update(post_id, message, image);
  res.send(updatedPost);
};

module.exports = update;
