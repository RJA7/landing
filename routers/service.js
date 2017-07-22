const serviceHandler = require(`../handlers/service`);
const express = require(`express`);
const router = express.Router();

router.get(`/`, serviceHandler.get);
router.patch(`/:id`, serviceHandler.patch);

module.exports = router;
