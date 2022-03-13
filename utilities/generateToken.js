require('dotenv/config');
const {MD5} = require('crypto-js');

// generating faux token for the purposes of implementation
const generateToken = (hashing) => {
    let secretKeySalt = MD5(process.env.secretKey)
    let shuffleToken = hashing+secretKeySalt;
    return [...shuffleToken].sort(()=>Math.random()-.5).join('');
};

module.exports = {generateToken};