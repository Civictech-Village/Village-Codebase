const listIssues = async (req, res) => {
  const {
    db: { Issues },
    body: { village_id },
  } = req;
  const issues = await Issues.list(village_id);
  res.send(issues);
};

module.exports = listIssues;
