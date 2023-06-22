const commentCount = async (req, res) => {
    const {
      db: { Comments },
      params: { id },
    } = req;
    const comments = await Comments.commentCount(id);
    res.send(comments);
  };
  
  module.exports = commentCount;
  