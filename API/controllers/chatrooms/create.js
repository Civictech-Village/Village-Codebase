const { v4: uuidv4 } = require('uuid')
const chatrooms = require('../../db/models/chatroom')
const createRoom = async (req, res, io) => {
  const { body: {name, user_id, recipient_id} } = req;

  // Create new chat room
  const newRoom = await chatrooms.newChatRoom(name, user_id, recipient_id);

  // Notify all connected clients that a new room has been created

console.log(newRoom)
  res.status(200).json({ id: newRoom.id });
};

module.exports = createRoom;