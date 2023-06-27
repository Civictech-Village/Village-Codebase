const knex = require("../knex");
const { v4: uuidv4 } = require("uuid");

class Chatrooms {
    static async getUserChatRooms(userId) {
        try {
          const chatRooms = await knex("chat_rooms")
            .select()
            .where("user_id", userId)
            .orWhere("recipient_id", userId);
      
          return chatRooms;
        } catch (err) {
          console.error(err);
          return null;
        }
      }

  static async getChatroomByUserIds(userId1, userId2) {
    try {
      const chatRoom = await knex("chat_rooms")
        .select()
        .where(function () {
          this.where("user_id", userId1).andWhere("recipient_id", userId2);
        })
        .orWhere(function () {
          this.where("user_id", userId2).andWhere("recipient_id", userId1);
        })
        .first();
  
      return chatRoom;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  


  static async newChatRoom(name, user_id, recipient_id) {
    try {
      const roomId = uuidv4();

      const alreadyExists = await knex.raw(
        `SELECT id
      FROM chat_rooms
      WHERE (user_id = ? AND recipient_id = ?)
         OR (user_id = ? AND recipient_id = ?)`,
        [user_id, recipient_id, recipient_id, user_id]
      );
      if (alreadyExists.rows[0]) {
        return alreadyExists.rows[0]
      }
      const result = await knex("chat_rooms")
        .insert({
          id: roomId,
          name,
          user_id,
          recipient_id,
        })
        .returning("*");
        console.log(result)
      return result[0];
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}

module.exports = Chatrooms;
