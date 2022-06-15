module.exports = {
  type: 'mysql',
  url:
    process.env.ENVIRONMENT === 'prod'
      ? process.env.DATABASE_URL
      : 'mysql://root:root@localhost:3306/lifetravel',
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
