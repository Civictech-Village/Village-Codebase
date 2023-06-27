const createIssue = async (req, res) => {
  console.log("reached the create function for issues");
  console.log(req.body);
  const {
    session,
    db: { Issues },
    body: { name, issue_desc, user_id },
    params: { id },
  } = req;
  console.log(session.userId, name, id, issue_desc);
  const issue = await Issues.create(session.userId, name, id, issue_desc);
  res.send(issue);
};

module.exports = createIssue;
