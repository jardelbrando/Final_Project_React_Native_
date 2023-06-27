module.exports = {
  client: 'postgresql',
  connection: {
    database: 'projeto_final',
    user: 'postgres',
    password: 'admin'
  },

  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'migrations',
    extension: 'cjs',
    directory: "../database/migrations"
  }
};
