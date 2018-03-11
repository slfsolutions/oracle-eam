const router = require('express').Router();
const controller = require('../../controllers/pm_schedules');

router.get('/', controller.list);
router.get('/:pm_schedule_id', controller.detail);
router.use('/:pm_schedule_id/activities', require('./activities'));

module.exports = router;
