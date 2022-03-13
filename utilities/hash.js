const bcrypt = require('bcrypt');

// using bcrypt to hash
const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

// using bcrypt to compare
const comparePassword = async (password, passwordhash) => {
    return await bcrypt.compare(password, passwordhash);
};

module.exports = {
    hashPassword,
    comparePassword
};