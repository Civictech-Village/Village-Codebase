const destroy = async (req, res) => {
  const {
    db: { Post },
    params: { post_id },
  } = req;
  const updatedList = await Post.destroy(post_id);
  res.send(updatedList);
};

module.exports = destroy;
