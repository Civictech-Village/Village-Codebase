/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable('issues', (table) => {
  table.increments('issue_id');
  table.integer('user_id').notNullable();
  table.integer('village_id').notNullable();
  table.string('issue_name');
  table.string('issue_desc');
  table.timestamps(true, true);
});
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('issues');
