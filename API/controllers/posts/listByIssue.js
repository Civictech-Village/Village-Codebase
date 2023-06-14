const listPosts = async (req, res) => {
  const {
    db: { Posts },
    params: { issue_id },
  } = req;
  const parties = await Posts.listByIssue(issue_id);
  res.send(parties);
};

module.exports = listPosts;
