const logger = require(`./helpers/getLogger`)(module);
const constants = require(`./constants`);
const env = process.env;
const nodeEnv = env.NODE_ENV = env.NODE_ENV === constants.PRODUCTION ? constants.PRODUCTION : constants.STAGING;
require(nodeEnv === constants.PRODUCTION ? `./config/production` : `./config/staging`);

const onDbReady = () => {
  const app = require(`./app`);
  const http = require(`http`);
  const port = parseInt(process.env.PORT);
  const server = http.createServer(app).listen(port);

  server.on(`listening`, () => logger.info(`Listening on http://localhost:${port}/`));

  server.on(`error`, error => {
    switch (error.code) {
      case `EACCES`:
        logger.error(`Port ${port} requires elevated privileges`);
        process.exit(1);
        break;
      case `EADDRINUSE`:
        logger.error(`Port ${port} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  });
};

const db = require(`./dbConnection`);

db.once(`connected`, () => {
  logger.info(`DB successfully connected.`);

  if (nodeEnv === constants.STAGING) {
    const dbFiller = require(`./helpers/dbFiller`);
    dbFiller.fillDb(onDbReady);
  } else {
    onDbReady();
  }
});
