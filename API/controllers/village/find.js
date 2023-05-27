const findVillage = async (req, res) => {
    const { db:{Village}, params:{id} } = req;
    const villages = await Village.find(id);
    if(!villages) return res.status(404).send('Not Found')
    res.send(villages);
  };
  
  module.exports = findVillage;