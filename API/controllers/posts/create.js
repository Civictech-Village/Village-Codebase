const { unlinkSync } = require('fs');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;

const createPost = async (req, res) => {
  const {
    session,
    db: { Posts },
    params: { id },
    body: { issue_id, message },
    file: { path },
  } = req;
  let image;
  const main = async () => {
    const result = await cloudinary.uploader.upload(path);
    image = result.url;
    unlinkSync(path);
    console.log(session.userId, issue_id, id, message, image);
    const post = await Posts.create(session.userId, issue_id, id, message, image);
    if (!post) return res.status(409).send('There is something wrong with the form you submitted.');
    res.send(post);
  };
  main();
};
/**
 * try {
    let image;
    const main = async () => {
      const result = await cloudinary.uploader.upload(path);
      image = result.url;
      unlinkSync(path);
      const village = await Village.create(name, image, location, user_id);
      if (!village) return res.status(409).send('There is something wrong with the form you submitted.');
      res.send(village);
    };
    main();
  } catch (error) {
    console.log(error);
  }
 */
module.exports = createPost;
