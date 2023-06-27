const findMembers = async (req, res) => {
    const { db: { Village }, params: { id } } = req;
    const villages = await Village.memberList(id);
    if (!villages) return res.status(404).send('Not Found');
    res.send(villages);
  };
  module.exports = findMembers;
  