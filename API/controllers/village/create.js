const Os = require('os')
const createVillage = async (req, res) => {
  const {
    db: { Village },
    body: { name, location, user_id },
    file: { path },
  } = req;
  let image
  
  if(Os.platform() === "win32") {
    image = path.split('\\')
  } else {
     image = path.split(`/`)
  }
  
  image = image[image.length - 1];
  console.log(image)
  // TODO: check if username is taken, what should you return?
  const village = await Village.create(name, image, location, user_id);
  if (!village) return res.status(409).send('There is something wrong with the form you submitted.');
  res.send(village);
};

module.exports = createVillage;
