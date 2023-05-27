const knex = require('../knex');

class Posts {
  constructor({ post_id, user_id, username, issue_id, message, time, image }) {
    this.post_id = post_id;
    this.user_id = user_id;
    this.username = username;
    this.issue_id = issue_id;
    this.message = message;
    this.time = time;
    this.image = image;
  }

  static async create(user_id, username, issue_id, message, image) {
    const query = `INSERT INTO posts (user_id, username, issue_id, message, image)
    VALUES (?, ?, ?, ?, ?) RETURNING *`;
    const { rows: [posts] } = await knex.raw(query, [user_id, username, issue_id, message, image]);
    return new Posts(posts);
  }

  static async listByIssue(issue_id) {
    const query = 'SELECT * FROM posts WHERE issue_id = ?';
    const { rows } = await knex.raw(query, [issue_id]);
    return rows.map((post) => new Posts(post));
  }

  static async find(post_id) {
    const query = 'SELECT * FROM posts WHERE id = ?';
    const { rows: [post] } = await knex.raw(query, [post_id]);
    return post ? new Posts(post) : null;
  }

  static async destroy(post_id) {
    try {
      const query = 'DELETE FROM posts WHERE post_id = ? RETURNING *;';
      const { rows } = await knex.raw(query, [post_id]);
      return rows.map((post) => new Posts(post));
    } catch (err) {
      console.log(err);
    }
  }

  static async update(post_id, message, image) {
    try {
      const query = `UPDATE posts SET message = ?, image = ?, WHERE post_id = ${post_id} RETURNING *;`;
      const { rows: [party] } = await knex.raw(query, [message, image]);
      return new Posts(party);
    } catch (err) {
      console.log(err);
    }
  }

  static async deleteAll() {
    return knex.raw('TRUNCATE posts;');
  }
}

module.exports = Posts;
