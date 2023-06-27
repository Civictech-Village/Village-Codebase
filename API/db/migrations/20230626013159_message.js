/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => {
    return knex.schema.createTable('messages', (table)=> {
        table.increments().primary();
        table.string('message', 2000).notNullable();
        table.uuid('room_id');
        table.integer('user_id').unsigned();
        table.timestamp('time_created').defaultTo(knex.fn.now()); // change data type to TIMESTAMP
        table.string('username')
        table.string('profile_picture')
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
    return knex.schema.dropTable('messages')
};