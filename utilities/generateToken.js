require('dotenv/config');
const { MD5 } = require('crypto-js');

// generating faux token for the purposes of implementation

/**
 * @param {string} hashing The hash
 * @returns {string} token
 */

const generateToken = (hashing) => {
    let secretKeySalt = MD5(process.env.secretKey)
    let shuffleToken = hashing+secretKeySalt;
    return [...shuffleToken].sort(()=>Math.random()-.5).join('');
};

module.exports = {generateToken};