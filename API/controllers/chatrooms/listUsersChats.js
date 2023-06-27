const { v4: uuidv4 } = require('uuid')
const chatrooms = require('../../db/models/chatroom')
const listUser = async (req, res, io) => {
  const {session} = req;

  // Create new chat room
  const allRooms = await chatrooms.getUserChatRooms(session.userId);

  // Notify all connected clients that a new room has been created

  res.status(200).send(allRooms);
};

module.exports = listUser;