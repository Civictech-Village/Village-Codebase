/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable('users_villages', (table) => {
    table.increments()
    table.integer('user_id').references('user_id').inTable('users').unique()
    table.string('user_type').defaultTo('member')
    table.integer('village_id').references('village_id').inTable('villages')
})

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('users_villages')
