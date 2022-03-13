const knex = require('./knex');

/**
 * @param {string} table The Table Name
 * @param {object} data The table data (object)
 * @returns { Promise<pending> } unresolved Promise
 */

const insert = (table, data) => {
    if (Object.prototype.toString.call(data) !== '[object Object]') throw new Error ('value must be object');
    
    return knex(`${table}`).insert(data)
    .then( () => knex(`${table}`) )
    .then(resultSet => resultSet.pop())
    .catch(err => err);
};


/**
 * @param {string} table The Table Name
 * @param {string} col The Column
 * @param {string} val The stringValue
 * @returns { Promise<pending> }
 */

const selectOne = (table, col, val) => {
    return knex(table).where(col, val).first();
};


module.exports = {
    insert,
    selectOne
};