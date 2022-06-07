module.exports = {
  type: 'mysql',
  url: 'mysql://bad154a7c5b577:c69fab62@us-cdbr-east-05.cleardb.net/heroku_0e1eb01b6f860d2?reconnect=true',
  migrationsRun: true,
  logging: true,
  timezone: '+0',
  bigNumberStrings: false,
  entities: [
    process.env.ENVIRONMENT === 'prod'
      ? '**/infrastructure/persistence/typeorm/entities/*.js'
      : 'dist/**/infrastructure/persistence/typeorm/entities/*.js',
  ],
  migrations: [
    process.env.ENVIRONMENT === 'prod'
      ? 'common/infrastructure/persistence/typeorm/migrations/*.js'
      : 'dist/common/infrastructure/persistence/typeorm/migrations/*.js',
  ],
  cli: {
    migrationsDir:
      process.env.ENVIRONMENT === 'prod'
        ? 'common/infrastructure/persistence/typeorm/migrations'
        : 'src/common/infrastructure/persistence/typeorm/migrations',
  },
};
