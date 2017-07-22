const winston = require(`winston`);
const path = require(`path`);

module.exports = module => {
  const dir = module.filename.split(path.sep).slice(-2).join(path.sep);

  return new winston.Logger({
    transports: [
      new winston.transports.Console({
        colorize: true,
        level   : process.env.logLevel,
        label   : dir
      })
    ]
  });
};
