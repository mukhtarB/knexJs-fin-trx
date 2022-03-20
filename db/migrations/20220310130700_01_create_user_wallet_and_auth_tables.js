/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', (table) => {
        table.increments();
        table.string('firstName').notNullable();
        table.string('lastName').notNullable();
        table.string('email').notNullable().unique();
        table.string('passwordhash').notNullable();
        table.timestamps(true, true, true);
    })
    .createTable('wallets', (table) => {
        table.increments();
        table.integer('walletId').notNullable().unsigned().unique();
        table.float('amount', 9, 2).notNullable().defaultTo(0.00);
        table.integer('user_id').notNullable().unsigned().unique().references('id').inTable('users').onDelete('CASCADE');
        table.timestamps(true, true, true);
    })
    .createTable('auth', (table) => {
        table.increments();
        table.integer('user_id').notNullable().unsigned().unique().references('users.id').onDelete('CASCADE');
        table.string('token').notNullable().unique();
        table.timestamps(true, true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex, Promise) {
    return knex.schema
    .table('wallets', (table) => {
        table.dropForeign('user_id')
    })
    .table('auth', (table) => {
        table.dropForeign('user_id')
    })
    .dropTableIfExists('users')
    .dropTableIfExists('wallets')
    .dropTableIfExists('auth')
};
