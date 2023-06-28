const knex = require("../knex");

class Followers {
  static async countFollowing(user_id) {
    try {
      const query = `SELECT COUNT(*) AS following_count
            FROM followers
            WHERE follower_id = ?;`;
      const { rows } = await knex.raw(query, [user_id]);
      return rows;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async countFollowers(user_id) {
    try {
      const query = `SELECT COUNT(*) AS follower_count
            FROM followers
            WHERE following_id = ?;`;
      const { rows } = await knex.raw(query, [user_id]);
      return rows;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}


module.exports = Followers