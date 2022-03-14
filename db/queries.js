const knex = require('./knex');

/**
 * @param {string} table The Table Name
 * @param {object} data The table data (object)
 * @returns { Promise<pending> } unresolved Promise
 */

const insert = (table, data) => {

    if (Object.prototype.toString.call(data) !== '[object Object]') throw'data must be of object type';
    
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

const selectOne = async (table, col, val) => {
    return knex(table).where(col, val).first()
    .catch(err => err);
};


/**
 * @param {string} table The Table Name
 * @param {string} identifierCol The identifier column for the where clause
 * @param {string} identifierValue The where clause value for specified column
 * @param {object} identifierValue data
 * @returns { Promise<pending> }
 */

 const update = async (table, identifierCol, identifierValue, data) => {

    if (typeof data !== 'object') throw 'data must be an Object';
    if (!identifierCol) throw "strict mode: where clause needed";
    if (!identifierValue) throw "strict mode: where clause needs a value";

    return knex(table).where(identifierCol, identifierValue)
    .update(data)
};


/**
 * @param {string} table The Table Name
 * @param {string} col The Column
 * @param {string} val The stringValue
 * @returns { Promise<pending> }
 */

const del = (table, col, val) => {

    if (!col) throw "strict mode: where clause needed";
    if (!val) throw "strict mode: where clause needs a value";
    
    return knex(table)
    .where(col, val).del();
};


module.exports = {
    insert,
    selectOne,
    update,
    del
};