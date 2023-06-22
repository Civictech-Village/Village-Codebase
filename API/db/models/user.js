const knex = require("../knex");
const { hashPassword, isValidPassword } = require("../../utils/auth-utils");

class User {
  #passwordHash = null;

  constructor({
    id,
    username,
    password_hash,
    profile_picture,
    email,
    gender,
    birthday,
    background_image,
    bio,
    full_name
  }) {
    this.id = id;
    this.username = username;
    this.#passwordHash = password_hash;
    this.profilePicture = profile_picture;
    this.gender = gender;
    this.birthday = birthday ? new Date(birthday) : null;
    this.email = email;
    this.backgroundImage = background_image;
    this.bio = bio
    this.full_name = full_name
  }

  static async list() {
    try {
      const query = "SELECT * FROM users";
      const { rows } = await knex.raw(query);
      return rows.map((user) => new User(user));
    } catch(err) {
      console.error(err);
      return null;
    }
  }

  static async find(id) {
    try {
      const query = "SELECT * FROM users WHERE id = ?";
      const {
        rows: [user],
      } = await knex.raw(query, [id]);
      console.log(user);
      return user ? new User(user) : null;
    } catch(err) {
      console.error(err)
      return null
    }

  }

  static async findByUsername(username) {
    try {
      const query = "SELECT * FROM users WHERE username = ?";
      const {
        rows: [user],
      } = await knex.raw(query, [username]);
      return user ? new User(user) : null;
    } catch (err) {
      console.error(err);
      return null
    }
  }

  static async create(username, password, email, gender, birthday) {
    try {
      const passwordHash = await hashPassword(password);

      const query = `INSERT INTO users (username, password_hash, email, gender, birthday)
        VALUES (?, ?, ?, ?, ?) RETURNING *`;
      const {
        rows: [user],
      } = await knex.raw(query, [
        username,
        passwordHash,
        email,
        gender,
        birthday,
      ]);
      return new User(user);
    } catch (err) {
      if (err.code === '23505' && err.constraint === 'users_username_unique') {
        // Duplicate key error handling
        console.error('Duplicate username:', username);
        // Handle the error appropriately, such as returning an error response or throwing a custom exception
        return err.code ;
      }
      console.error(err);
      return null;
    }
  }

  static async deleteAll() {
    return knex.raw("TRUNCATE users RESTART IDENTITY");
  }

  // static async update (
  //   username,
  //   profile_picture,
  //   email,
  //   gender,
  //   birthday,
  //   background_image,
  // ) {
  //   // dynamic queries are easier if you add more properties
  //   const [updatedUser] = await knex("users")
  //     .where({ id: this.id })
  //     .update({
  //       username,
  //       profile_picture,
  //       email,
  //       gender,
  //       birthday,
  //       background_image })
  //     .returning("*");
  //   return updatedUser ? new User(updatedUser) : null;
  // };

  static async update(id, username, email, gender, bio, fullName) {
    try {
      const query = `UPDATE users SET username = ?, email = ?, gender = ?, bio = ?, full_name = ? WHERE id = ${id} RETURNING *;`;
      const {
        rows: [party],
      } = await knex.raw(query, [username, email, gender, bio, fullName]);
      return new User(party);
    } catch (err) {
      console.log(err);
    }
  }

  static async updateProfilePicture (profilePicture, id) {
    try {
      const query = `UPDATE users set profile_picture = ? where id = ? RETURNING *;`
      const user = await knex.raw(query, [profilePicture, id])
      return user;
    } catch (e) {
      console.log(e);
    }
  }
  isValidPassword = async (password) => isValidPassword(password, this.#passwordHash);
}

module.exports = User;
