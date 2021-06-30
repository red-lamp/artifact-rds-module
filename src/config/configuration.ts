export default () => ({
  PORT: parseInt(process.env.PORT, 10) || 3000,
  PG_DB_CONFIG: {
    dbuser: process.env.DBUSER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT,
    host: process.env.HOST,
    ssl: process.env.SSL !== 'false' ? true : false,
    logging: process.env.LOGGING !== 'false' ? console.log : undefined,
  },
});
