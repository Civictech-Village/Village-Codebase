/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable('posts', (table) => {
  table.increments('post_id');
  table.integer('user_id').notNullable();
  table.integer('issue_id').notNullable();
  table.integer('village_id');
  table.string('message');
  table.string('image');
  table.timestamps(true, true);
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('posts');
