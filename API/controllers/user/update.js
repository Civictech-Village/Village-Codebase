const { unlinkSync } = require('fs');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const { isAuthorized } = require('../../utils/auth-utils');

const updateUser = async (req, res) => {
  const {
    session,
    db: { User },
    params: { id },
    body: { username, email, gender, birthday, background_image },
    file: { path }
  } = req;
  const main = async () => {
    if (!isAuthorized(id, session)) return res.sendStatus(403);
    let user = await User.find(id);
    if (!user) return res.sendStatus(404);

    const result = await cloudinary.uploader.upload(path);
    const profile_picture = result.url;
    unlinkSync(path);
    background_image = null
    user = User.update(username, profile_picture, email, gender, birthday, background_image)
    if (!user) return res.status(409).send('There is something wrong with the form you submitted.');
    res.send(user);
  };
  main();
};

module.exports = updateUser;
