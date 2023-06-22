const { isAuthorized } = require('../../utils/auth-utils');

const updateUser = async (req, res) => {
  let {
    session,
    db: { User },
    params: { id },
    body: { username, email, gender, bio, fullName },
  } = req;
  console.log(id, username, email, gender, bio, fullName);
  const main = async () => {
    if (!isAuthorized(id, session)) return res.sendStatus(403);
    let user = await User.find(id);
    if (!user) return res.sendStatus(404);
    user = User.update(id, username, email, gender, bio, fullName)
    if (!user) return res.status(409).send('There is something wrong with the form you submitted.');
    res.send(user);
  };
  main();
};

module.exports = updateUser;
