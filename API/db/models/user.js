const knex = require('../knex');
const { hashPassword, isValidPassword } = require('../../utils/auth-utils');

class User {
  #passwordHash = null;

  constructor({ id, username, password_hash,profile_picture, email, gender, birthday, phone, background_image}) {
    this.id = id;
    this.username = username;
    this.#passwordHash = password_hash;
    this.profilePicture = profile_picture
    this.gender = gender;
    this.birthday = birthday ? new Date(birthday) : null
    this.email = email;
    this.phone = phone;
    this.backgroundImage = background_image
  }

  static async list() {
    const query = 'SELECT * FROM users';
    const { rows } = await knex.raw(query);
    return rows.map((user) => new User(user));
  }

  static async find(id) {
    const query = 'SELECT * FROM users WHERE id = ?';
    const { rows: [user] } = await knex.raw(query, [id]);
    console.log(user)
    return user ? new User(user) : null;
  }

  static async findByUsername(username) {
    const query = 'SELECT * FROM users WHERE username = ?';
    const { rows: [user] } = await knex.raw(query, [username]);
    return user ? new User(user) : null;
  }

  static async create(username, password, email, gender, birthday) {
    const passwordHash = await hashPassword(password);

    const query = `INSERT INTO users (username, password_hash, email, gender, birthday)
      VALUES (?, ?, ?, ?, ?) RETURNING *`;
    const { rows: [user] } = await knex.raw(query, [username, passwordHash, email, gender, birthday]);
    return new User(user);
  }

  static async deleteAll() {
    return knex.raw('TRUNCATE users;');
  }

  update = async (username) => { // dynamic queries are easier if you add more properties
    const [updatedUser] = await knex('users')
      .where({ id: this.id })
      .update({ username })
      .returning('*');
    return updatedUser ? new User(updatedUser) : null;
  };

  isValidPassword = async (password) => (
    isValidPassword(password, this.#passwordHash)
  );
}

module.exports = User;
