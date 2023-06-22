const listUsersVillages = async (req, res) => {
    const { db: { Village }, params: { id } } = req;
    const villages = await Village.findUsersVillage(id);
    if (!villages) return res.status(404).send('Not Found');
    res.send(villages);
  };
  module.exports = listUsersVillages;
  