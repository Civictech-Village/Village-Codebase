const createUser = async (req, res) => {
  const {
    session,
    db: { User },
    body: { username, password, email, gender, birthday },
  } = req;
  console.log(email,gender, birthday)
  // TODO: check if username is taken, what should you return?
  const user = await User.create(username, password, email, gender, birthday);
  session.userId = user.id;

  res.send(user);
};

module.exports = createUser;
