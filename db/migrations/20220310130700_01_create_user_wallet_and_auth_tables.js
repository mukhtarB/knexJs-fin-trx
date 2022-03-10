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
    .createTable('wallet', (table) => {
        table.increments();
        table.string('walletId', 8).notNullable().unique();
        table.float('amount', 2).notNullable();
        table.integer('user_id').unsigned().unique().references('id').inTable('users').onDelete('CASCADE');
        
        table.timestamps(true, true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex, Promise) {
    return knex.schema.dropTable(users)
    .dropTable(wallet);
};
