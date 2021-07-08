module.exports = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    "src/entities/User.ts",
  ],
  migrationsTableName: "migrations",
  migrations: ["src/migrations/*.ts"],
  cli: {
    entitiesDir: "src/entities/",
    migrationsDir: "src/migrations"
  },
  ssl: process.env.NODE_ENV === 'production',
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};
