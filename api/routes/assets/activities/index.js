const router = require('express').Router({mergeParams: true});
const controller = require('../../../controllers/assets/activities');

router.get('/', controller.list);
router.get('/:activity_id', controller.detail);
router.use('/:activity_id/suppressions', require('./suppressions'));

module.exports = router;
