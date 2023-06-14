const createIssue = async (req, res) => {
  console.log("reached the create function for issues");
  const {
    session,
    db: { Issues },
    body: {name, village_id, user_id },
  } = req;
  //Replace user_id with session.userId if you end up connecting front end
  const issue = await Issues.create(name, user_id , village_id);
  res.send(issue);
};

module.exports = createIssue;
