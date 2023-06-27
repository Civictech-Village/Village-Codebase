const knex = require("../knex");

class Village {
  constructor({ village_id, name, image, location }) {
    this.village_id = village_id;
    this.name = name;
    this.image = image;
    this.location = location;
  }

  static async list() {
    try {
      const query = `SELECT * FROM villages`;
      const { rows } = await knex.raw(query);
      return rows;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async findUser(userId, villageId) {
    try {
      const query = `SELECT * FROM users_villages WHERE village_id = ? AND user_id = ?`
      const {rows:[row]} = await knex.raw(query,[villageId, userId]); 
      return row;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async find(id) {
    try {
      const query = `SELECT * FROM villages WHERE village_id = ?`;
      const { rows: [village] } = await knex.raw(query, [id]);
      return village ? new Village(village) : null;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async memberList(village_id) {
    try {
      const query = `SELECT users.id, users.username, users.profile_picture
      FROM Users
      JOIN users_villages ON users.id = users_villages.user_id
      JOIN villages ON users_villages.village_id = villages.village_id
      WHERE villages.village_id = ?`;
      const { rows } = await knex.raw(query, [village_id]);
      return rows
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async create(name, image, location, user_id, lon, lat) {
    try {
      const createQuery = `
      INSERT INTO villages (name, image, location, latitude, longitude) VALUES (?,?,?, ?, ?) RETURNING *;
    `;
      const joinQuery = `
      INSERT INTO users_villages (user_id, user_type, village_id) VALUES (?,?,?) RETURNING *;
    `;

      const createParams = [name, image, location, lat, lon];
      const joinParams = [user_id, "owner", null];

      return await knex.transaction(async (trx) => {
        try {
          const { rows: [village] } = await trx.raw(createQuery, createParams);
          console.log(911);
          joinParams[2] = village.village_id;
          const { rows: [join] } = await trx.raw(joinQuery, joinParams);
          return { village };
        } catch (err) {
          await trx.rollback();
          console.error(err);
        }
      });
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async join(user_id, village_id) {
    try {
      const query = `INSERT INTO users_villages (user_id, village_id) VALUES (?,?) RETURNING *`;
      const { rows: [village] } = await knex.raw(query, [user_id, village_id]);
      return village;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async destroy(user_id, village_id) {
    try {
      const query = `DELETE FROM users_villages WHERE village_id = ? AND user_id = ?`;
      const { rows: [village] } = await knex.raw(query, [village_id, user_id ]);
      return village;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async findUsersVillage (user_id) {
    try {
      const query = `SELECT villages.*
      FROM villages
      JOIN users_villages ON villages.village_id = users_villages.village_id
      JOIN users ON users.id = users_villages.user_id
      WHERE users.id = ?;
       `
       const {rows} = await knex.raw(query, [user_id])
      return rows
    } catch(err) {
      console.error(err)
      return null
    }
  }
}

module.exports = Village;
