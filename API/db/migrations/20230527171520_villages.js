/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable('villages', (table) => {
  table.increments('village_id');
  table.string('name').notNullable().unique();
  table.string('image').notNullable();
  table.string('location').notNullable();
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('villages');
