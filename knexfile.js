// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

    test: {
        client: 'mysql',
        connection: {
            host : process.env.DB_HOST || '127.0.0.1',
            port : process.env.DB_PORT || 3306,
            user : process.env.DB_USER,
            password : process.env.DB_PASSWORD,
            database : process.env.TEST_DB_NAME
        },
        migrations: {
            directory: __dirname + '/db/migrations',
        },
        seeds: {
            directory: __dirname + '/db/seeds',
        },
    },
  
    development: {
        client: 'mysql',
        connection: {
            host : process.env.DB_HOST || '127.0.0.1',
            port : process.env.DB_PORT || 3306,
            user : process.env.DB_USER,
            password : process.env.DB_PASSWORD,
            database : process.env.DB_NAME
        },
        migrations: {
            directory: __dirname + '/db/migrations',
        },
        seeds: {
            directory: __dirname + '/db/seeds',
        },
    },

    staging: {
        client: 'mysql',
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: __dirname + '/db/migrations',
        },
        seeds: {
            directory: __dirname + '/db/seeds',
        },
    },

    production: {
        client: 'mysql',
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: __dirname + '/db/migrations',
        },
        seeds: {
            directory: __dirname + '/db/seeds',
        },
    },

};
