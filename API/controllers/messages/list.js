const messageHistory = async (req, res) => {
    const { session, db: { Message } } = req;
    if (!session.userId) return res.sendStatus(401);
  
    // socket.io logic here
    const { room_id } = req.params;
    const messages = await Message.getMessageHistory(room_id);
    console.log(messages)
    res.send(messages);
  };
  
  module.exports = messageHistory;