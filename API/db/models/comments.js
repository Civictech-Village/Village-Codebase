const knex = require("../knex");

class Comments {
  static async create(post_id, user_id, text) {
    try {
      const query = `INSERT INTO comments (post_id, user_id, text) VALUES (?, ?, ?) RETURNING *`;
      const { rows } = await knex.raw(query, [post_id, user_id, text]);
      return rows;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async list(post_id) {
    try {
      const query = `SELECT comments.*, users.username, users.profile_picture
      FROM comments
      JOIN users ON comments.user_id = users.id
      WHERE comments.post_id = ?
      GROUP BY comments.id, comments.post_id, users.username, users.profile_picture
      `;
      const { rows } = await knex.raw(query, [post_id]);
      return rows;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async commentCount(post_id) {
    try {
      const query = `SELECT COUNT(*) AS comment_count FROM comments
      WHERE post_id = ?
      `;
      const { rows:[count]} = await knex.raw(query, [post_id]);
      return count;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}

module.exports = Comments;
