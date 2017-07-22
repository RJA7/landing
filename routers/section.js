const sectionHandler = require(`../handlers/section`);
const express = require(`express`);
const router = express.Router();

router.get(`/`, sectionHandler.get);
router.patch(`/:sectionName`, sectionHandler.patch);

module.exports = router;
