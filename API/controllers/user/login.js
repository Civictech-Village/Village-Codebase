const loginUser = async (req, res) => {
  const {
    session,
    db: { User },
    body: { username, password, remember },
  } = req;

  const user = await User.findByUsername(username);
  if (!user) return res.sendStatus(404);

  const isPasswordValid = await user.isValidPassword(password);
  if (!isPasswordValid) return res.sendStatus(401);

  session.userId = user.id;
  console.log(user);
  console.log(remember);
  if (remember) {
    const newExpiration = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    console.log(`Session expiration extended to: ${newExpiration}`);
  }
  res.send(user);
};

module.exports = loginUser;
