const joinVillage = async (req, res) => {
  const { db: { Village }, params: { id }, body: { user_id } } = req;
  const villages = await Village.join(user_id, id);
  if (!villages) return res.status(404).send('An error has occured');
  res.send(villages);
};
module.exports = joinVillage;
