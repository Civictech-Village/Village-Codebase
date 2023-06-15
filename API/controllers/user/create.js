const createUser = async (req, res) => {
  const {
    session,
    db: { User },
    body: { username, password, email, gender, birthday },
  } = req;
  // TODO: check if username is taken, what should you return?
  const user = await User.create(username, password, email, gender, birthday);
  if(user == '23505'){ return res.status(400).send(`Username ${username} already exists!`)}
  session.userId = user.id;

  res.send(user);
};

module.exports = createUser;
