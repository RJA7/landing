const logger = require(`../helpers/getLogger`)(module);
const constants = require(`../constants`);
const sectionRouter = require(`./section`);
const serviceRouter = require(`./service`);
const projectRouter = require(`./project`);
const LANGUAGES = constants.LANGUAGES;
const express = require(`express`);
const router = express.Router();
const path = require(`path`);

router.get(`/`, (req, res, next) => res.sendFile(path.resolve(__dirname, `../public/index.html`)));

router.get(`/user`, (req, res, next) => {
  const user = req.session.user = req.session.user || {};

  user.lang = LANGUAGES.indexOf(req.query.lang) !== -1 ? req.query.lang :
    LANGUAGES.indexOf(user.lang) !== -1 ? user.lang : LANGUAGES[0];

  res.status(200).send(user);
});

router.use(`/`, (req, res, next) => {
  if (req.method === `PATCH` && req.get(`X-Edit-Header`) !== process.env.editPass) {
    return next({status: 403, message: `wrong password`});
  }

  next();
});

router.use(`/sections`, sectionRouter);
router.use(`/services`, serviceRouter);
router.use(`/projects`, projectRouter);
router.use((req, res, next) => next({status: 404, message: `Not Found`}));

router.use((err, req, res, next) => {
  const status = err.status || 500;

  if (process.env.NODE_ENV === constants.PRODUCTION) {
    return res.status(status).send(err);
  } else {
    logger.error(err);
    return res.status(status).send(err);
  }
});

module.exports = router;
