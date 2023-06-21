const listComments = async (req, res) => {
    const {
      db: { Comments },
      params: { id },
    } = req;
    const comments = await Comments.list(id);
    res.send(comments);
  };
  
  module.exports = listComments;
  