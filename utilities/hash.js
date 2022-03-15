const bcrypt = require('bcrypt');

// using bcrypt to hash

/**
 * @param {string} password Password
 * @returns {string} hash
 */

const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};


// using bcrypt to compare
/**
 * @param {string} password Password
 * @param {string} passwordhash Passwordhash
 * @returns {boolean} isPasswordMatch
 */

const comparePassword = async (password, passwordhash) => {
    return await bcrypt.compare(password, passwordhash);
};

module.exports = {
    hashPassword,
    comparePassword
};