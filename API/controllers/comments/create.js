const createComments = async (req, res) => {
  const {
    session,
    db: { Comments },
    params: { id },
    body: { text },
  } = req;
  const comments = await Comments.create(id, session.userId, text);
  res.send(comments);
};

module.exports = createComments;
