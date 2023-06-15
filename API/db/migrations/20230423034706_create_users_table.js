/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable('users', (table) => {
  table.increments('id');
  table.string('username').notNullable().unique();
  table.string('password_hash').notNullable();
  table.string('profile_picture');
  table.string('gender');
  table.string('birthday');
  table.string('location');
  table.string('email');
  table.string('phone');
  table.string('background_image');
  table.integer('village_id');
  table.timestamps(true, true);
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('users');
