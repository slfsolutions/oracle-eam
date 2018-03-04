const router = require('express').Router();
const controller = require('../../controllers/activity_operations');

router.get('/', controller.list);
router.get('/:operation_id', controller.detail);
router.use('/:operation_id/resources', require('./resources'));

module.exports = router;
