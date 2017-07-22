const projectHandler = require(`../handlers/project`);
const express = require(`express`);
const router = express.Router();

router.get(`/`, projectHandler.get);
router.patch(`/:id`, projectHandler.patch);

module.exports = router;
