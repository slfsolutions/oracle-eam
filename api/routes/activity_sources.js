const router = require('express').Router();
const controller = require('../controllers/activity_sources');

router.get('/', controller.list);
router.get('/:activity_source_code', controller.detail);

module.exports = router;
