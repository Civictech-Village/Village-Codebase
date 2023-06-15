const listIssues = async (req, res) => {
  const {
    db: { Issues },
    params: { id },
  } = req;
  const issues = await Issues.list(id);
  res.send(issues);
};

module.exports = listIssues;
