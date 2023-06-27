const Message = require("../../db/models/message");


const sendMessage = async (message, userId, roomId, profilePic, username) => {

  const result = await Message.insertMessage(message, userId, roomId, profilePic, username);
  return { ...result};
};

module.exports = sendMessage;