require('dotenv').config();

const postgres = {

  client: 'pg',
  useNullAsDefault: true,

}


      module.exports = {

        development: {
          ...postgres,
          connection: {
            database: "devdesk-database",
            host: "127.0.0.1",
            password: process.env.DB_PASS,
            user: 'postgres'
          }
        },

        testing: {
          ...postgres,
          connection: {
            database: "devdesk-testdb",
            host: "127.0.0.1",
            password: process.env.DB_PASS,
            user: 'postgres'
          }
        },

        production: {
          ...postgres,
          connection: {
            database: process.env.DATABASE,
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.DB_PASSWORD
          },
          ssl: true
        }

      };
