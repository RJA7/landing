const logger = require(`./helpers/getLogger`)(module);
const mongoose = require(`mongoose`);
const env = process.env;

mongoose.connect(env.DB_HOST, env.DB_NAME, env.DB_PORT, {
  user: env.DB_USER,
  pass: env.DB_PASS
});

const db = mongoose.connection;

db.on(`error`, err => {
  logger.error(`DB can't connect.`);
  logger.error(err);
  process.exit(1);
});

module.exports = db;
