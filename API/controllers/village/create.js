const { unlinkSync } = require('fs');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;

const createVillage = async (req, res) => {
  const {
    db: { Village },
    body: { name, location, user_id },
    file: { path },
  } = req;

  try {
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
};

module.exports = createVillage;
