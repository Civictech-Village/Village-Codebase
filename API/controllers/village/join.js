const joinVillage = async (req, res) => {
  const { db: { Village }, params: { id }, session } = req;
  const villages = await Village.join(session.userId, id);
  if (!villages) return res.status(404).send('An error has occured');
  res.send(villages);
};
module.exports = joinVillage;
