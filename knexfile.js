// Update with your config settings.
const settings = require("./settings.json");
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      user: settings.user,
      password: settings.password,
      database: settings.database,
      host: settings.host,
      port: settings.port,
      sl: settings.ssl

    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
