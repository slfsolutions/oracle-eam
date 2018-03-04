const router = require('express').Router();
const controller = require('../controllers/activity_causes');

router.get('/', controller.list);
router.get('/:activity_cause_code', controller.detail);

module.exports = router;
