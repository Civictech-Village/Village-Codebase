const knex = require("../knex");

class Posts {
  constructor({
    post_id,
    user_id,
    issue_id,
    message,
    time,
    image,
    village_id,
  }) {
    this.post_id = post_id;
    this.user_id = user_id;
    this.issue_id = issue_id;
    this.message = message;
    this.village_id = village_id;
    this.time = time;
    this.image = image;
  }

  static async create(user_id, issue_id, village_id, message, image = null) {
    const query = `INSERT INTO posts (user_id, issue_id,village_id, message, image)
    VALUES (?, ?, ?, ?, ?) RETURNING *`;
    const {
      rows: [posts],
    } = await knex.raw(query, [user_id, issue_id, village_id, message, image]);
    return new Posts(posts);
  }

  static async listByIssue(issue_id) {
    const query = "SELECT * FROM posts WHERE issue_id = ?";
    const { rows } = await knex.raw(query, [issue_id]);
    return rows.map((post) => new Posts(post));
  }

  static async listVillages(village_id) {
    try {
      const query = `SELECT posts.user_id,
      posts.issue_id,
      posts.message,
      posts.village_id,
      issues.name
      FROM posts 
      JOIN issues ON issues.issue_id=posts.issue_id
      WHERE posts.village_id = ?
      `;
      const { rows } = await knex.raw(query, [village_id]);
      console.log(rows);
      return rows;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async find(post_id) {
    const query = "SELECT * FROM posts WHERE id = ?";
    const {
      rows: [post],
    } = await knex.raw(query, [post_id]);
    return post ? new Posts(post) : null;
  }

  static async destroy(post_id) {
    try {
      const query = "DELETE FROM posts WHERE post_id = ? RETURNING *;";
      const { rows } = await knex.raw(query, [post_id]);
      return rows.map((post) => new Posts(post));
    } catch (err) {
      console.log(err);
    }
  }

  static async update(post_id, message, image) {
    try {
      const query = `UPDATE posts SET message = ?, image = ?, WHERE post_id = ${post_id} RETURNING *;`;
      const {
        rows: [party],
      } = await knex.raw(query, [message, image]);
      return new Posts(party);
    } catch (err) {
      console.log(err);
    }
  }

  static async deleteAll() {
    return knex.raw("TRUNCATE posts;");
  }
}

module.exports = Posts;
