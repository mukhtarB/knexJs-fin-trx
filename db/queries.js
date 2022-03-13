const knex = require('./knex');

const insert = (table, objValue) => {
    if (Object.prototype.toString.call(objValue) !== '[object Object]') throw new Error ('value must be object');
    
    return knex(`${table}`).insert(objValue)
    .then( () => knex(`${table}`) )
    .then(resultSet => resultSet.pop());
};

const selectOne = (table, email) => {
    return knex(table).where('email', email).first();
};

module.exports = {
    insert,
    selectOne
};