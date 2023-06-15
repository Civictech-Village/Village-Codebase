const listVillages = async (req, res) => {
  const { Village } = req.db;
  const villages = await Village.list();
  res.send(villages);
};
module.exports = listVillages;
