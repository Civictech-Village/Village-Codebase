const findUser = async (req, res) => {
  console.log('route hit')
    const { db: { Village }, params: { id }, session } = req;
    const villages = await Village.findUser(session.userId, id);

    if (!villages) return res.status(404).send('An error has occured');

    res.send(villages);
  };
  module.exports = findUser;
  