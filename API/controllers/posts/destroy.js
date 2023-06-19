const destroy = async (req, res) => {
  const {
    db: { Posts },
    params: {post_id},
  } = req;


  const updatedList = await Posts.destroyPost(post_id);
  console.log(updatedList)
  res.send(updatedList);
};

module.exports = destroy;
