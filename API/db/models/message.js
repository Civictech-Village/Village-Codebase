const knex = require("../knex");

class Message {
  static async getMessageHistory(roomId) {
    try {
      const messages = await knex.raw(
        `
          SELECT messages.message, messages.time_created AS time, users.username, users.id, users.profile_picture AS profilePic
          FROM messages
          JOIN users ON messages.user_id = users.id
          WHERE messages.room_id = ?
        `,
        [roomId]
      );
      return messages.rows;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async insertMessage(message, userID, roomId, profilePic, username) {
    try {
      const result = await knex("messages")
        .insert({
          message,
          user_id: userID,
          room_id: roomId,
          time_created: new Date(),
          username: username,
          profile_picture: profilePic,
        })
        .returning("*");
      return result;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async saveImage(message, type, userID, roomId) {
    try {
      const result = await knex("messages")
        .insert({
            message,
          user_id: userID,
          room_id: roomId,
          time_created: new Date(),
          type,
        })
        .returning("*");
      return result;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}

module.exports = Message;
