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

  static async isFollowing(follower_id, profile_id) {
    try {
      const query = `SELECT COUNT(*) AS isFollowing
        FROM followers
        WHERE follower_id = ? AND following_id = ?;
        `;
      const { rows } = await knex.raw(query, [follower_id, profile_id]);
      console.log(rows)
      return rows
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async createFollower(follower_id, following_id) {
    try {
      const query = `INSERT INTO followers (follower_id, following_id)
                    VALUES (?, ?) RETURNING *`;
      const { rows } = await knex.raw(query, [follower_id, following_id]);
      return rows;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async unFollow(follower_id, following_id) {
    try {
      const query = `DELETE FROM followers
      WHERE follower_id = ? AND following_id = ?;`;
      const { rows } = await knex.raw(query, [follower_id, following_id]);
      return rows;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}

module.exports = Followers;
