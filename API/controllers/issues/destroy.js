const destroy = async (req, res) => {
    const {
      db: { Issues },
      params: { issue_id },
    } = req;
    const updatedList = await Issues.destroy(issue_id);
    res.send(updatedList);
  };
  module.exports = destroy;
  