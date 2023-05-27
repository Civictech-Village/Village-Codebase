const createVillage = async (req, res) => {
    const {
      session,
      db: { Village },
      body: { name,image,location,user_id },
    } = req;
  
    // TODO: check if username is taken, what should you return?
    const village = await Village.create(name, image, location,user_id);
    if(!village) return res.status(409).send('There is something wrong with the form you submitted.')
    res.send(village);
  };
  
  module.exports = createVillage;
  