require('dotenv/config');
const {MD5} = require('crypto-js');

// generating faux token for the purposes of implementation
const generateToken = (hash) => {
    let secretKeySalt = MD5(process.env.secretKey)
    let shuffleToken = hash+secretKeySalt;
    return [...shuffleToken].sort(()=>Math.random()-.5).join('');
};

module.exports = generateToken;