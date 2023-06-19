const knex = require("../knex");

class Issues {
  constructor({ issue_id, name, user_id, village_id }) {
    this.issue_id = issue_id;
    this.name = name;
    this.user_id = user_id;
    this.village_id = village_id;
  }

  static async create(user_id, name, village_id, issue_desc) {
    try {
      const query = `INSERT INTO issues ( name, user_id, village_id, issue_desc)
            VALUES (?,?,?,?) RETURNING *`;
      const {
        rows: [issue],
      } = await knex.raw(query, [name, user_id, village_id, issue_desc]);
      return new Issues(issue);
    } catch (err) {
        if (err.code === '23505' && err.constraint === 'issues_name_key') {
            // Duplicate key error handling
            console.error('Duplicate username:', name);
            // Handle the error appropriately, such as returning an error response or throwing a custom exception
            return err.code;
          }
      console.error(err);
      return null;
    }
  }

  static async list(village_id) {
    try {
      const query = `SELECT * FROM issues WHERE village_id = ?`;
      const { rows } = await knex.raw(query, [village_id]);
      return rows.map((issue) => new Issues(issue));
    } catch (err) {
        console.error(err)
        return null;
    }
  }

  static async destroy(issue_id) {
    try {
      const query = "DELETE FROM issues WHERE issue_id = ? RETURNING *;";
      const { rows } = await knex.raw(query, [issue_id]);
      return rows.map((post) => new Issues(post));
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Issues;
