const knex = require('./knex');

const insert = (table, objValue) => {
    if (Object.prototype.toString.call(objValue) !== '[object Object]') throw new Error ('value must be object');
    
    return knex(`${table}`).insert(objValue)
    .then( () => knex(`${table}`) )
    .then(resultSet => resultSet.pop())
    .catch(err => err || err.sqlMessage);
};

const selectOne = (table, col, val) => {
    return knex(table).where(col, val).first();
};

module.exports = {
    insert,
    selectOne
};