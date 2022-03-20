/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
    await knex('users').del();
    await knex('users').insert([
        {
            id: 1,
            firstName: 'Logout',
            lastName: 'Tester',
            email: 'logout@test.com',
            passwordhash: 'someHashedPassword'
        },
    ]);
    
    await knex('auth').insert([
        {token: 'seededTokenForUserSix', user_id: 1},
    ]);
};
