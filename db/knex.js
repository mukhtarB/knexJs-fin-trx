// establishing connection
const knex = require('knex');
const knexConfig = require('../knexfile');

const environment = process.env.ENVIRONMENT || 'development';
const envConfig = knexConfig[environment];

const connection = knex(envConfig);

module.exports = connection;