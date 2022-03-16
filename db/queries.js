const knex = require('./knex');
const { errFn } = require('../utilities/errHandler');

/**
 * - Inserts entry into db
 * @param {string} table The Table Name
 * @param {object} data The table data
 * @returns {Promise<pending>} dataInserted
 */

const insert = async (table, data) => {

    if (Object.prototype.toString.call(data) !== '[object Object]') throw errFn(500, 'data must be of object type');
    
    return knex(`${table}`).insert(data)
    .then( () => knex(`${table}`) )
    .then(resultSet => resultSet.pop())
    .catch(err => err);
};


/**
 * - Selects a single entry from db
 * @param {string} table The Table Name
 * @param {string} col The Column
 * @param {string} val The stringValue
 * @returns { Promise<pending> } dataQueried
 */

const selectOne = async (table, col, val) => {
    return knex(table).where(col, val).first()
    .catch(err => err);
};


/**
 * - Updates entry in db
 * @param {string} table The Table Name
 * @param {string} identifierCol The identifier column for where clause
 * @param {string} identifierValue The where clause value for specified column
 * @param {object} identifierValue dataToUpdate
 * @returns {boolean} tableDidUpdate
 */

 const update = async (table, identifierCol, identifierValue, data) => {

    if (typeof data !== 'object') throw errFn(500, 'data must be an Object');
    if (!identifierCol) throw errFn(500, "strict mode: where clause needed");
    if (!identifierValue) throw errFn(500, "strict mode: where clause needs a value");

    return knex(table).where(identifierCol, identifierValue)
    .update(data)
};


/**
 * - Deletes entry from db
 * @param {string} table The Table Name
 * @param {string} col The Column
 * @param {string} val The stringValue
 * @returns { Promise<pending> }
 */

const del = (table, col, val) => {

    if (!col) throw errFn(500, "strict mode: where clause needed");
    if (!val) throw errFn(500, "strict mode: where clause needs a value");
    
    return knex(table)
    .where(col, val).del();
};


module.exports = {
    insert,
    selectOne,
    update,
    del
};