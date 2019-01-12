const dotenv = require('dotenv');
dotenv.load();

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: process.env.DB_PORT,
    },
    migrations: {
      tableName: 'migrations',
      directory: `${ __dirname }/database/migrations`,
    },
    seeds: {
      directory: `${ __dirname }/database/seeds`,
    },
  },
  production: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: process.env.DB_PORT,
    },
    migrations: {
      tableName: 'migrations',
      directory: `${ __dirname }/database/migrations`,
    },
    seeds: {
      directory: `${ __dirname }/database/seeds`,
    },
  }
};