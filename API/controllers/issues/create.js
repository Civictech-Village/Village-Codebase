const createIssue = async (req, res) => {
  console.log("reached the create function for issues");
  const {
    session,
    db: { Issues },
    body: {name,},
    params: { id }
  } = req;
  //Replace user_id with session.userId if you end up connecting front end
  const issue = await Issues.create(name, session.userId , id);
  res.send(issue);
};

module.exports = createIssue;
