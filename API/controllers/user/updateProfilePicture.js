const { unlinkSync } = require('fs');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const { isAuthorized } = require('../../utils/auth-utils');


const updateProfilePicture = async (req, res) => {
    console.log("we made it")
    let {
        db: { User },
        session,
        params: { id },
        file: { path },
    } = req;
    // if (!isAuthorized(id, session)) return res.sendStatus(403);
    let user = await User.find(id);
    if (!user) return res.sendStatus(404);

    const result = await cloudinary.uploader.upload(path);
    const profile_picture = result.url;
    unlinkSync(path);
    user = User.updateProfilePicture(profile_picture, id);
    res.send(user);
}

module.exports = updateProfilePicture;