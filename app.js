const httpSession = require(`./helpers/httpSession`);
const bodyParser = require(`body-parser`);
const favicon = require(`serve-favicon`);
const router = require(`./routers`);
const express = require(`express`);
const logger = require(`morgan`);
const path = require(`path`);
const app = express();

app.use(favicon(path.resolve(__dirname, `public/img/favicon.ico`)));
app.use(express.static(path.join(__dirname, `public`)));
app.use(bodyParser.json({limit: `50mb`}));
app.use(bodyParser.urlencoded({limit: `50mb`, extended: true}));
app.use(httpSession());
app.use(logger(`dev`));
app.use(router);

module.exports = app;
