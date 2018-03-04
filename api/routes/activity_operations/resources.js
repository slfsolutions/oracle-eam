const router = require('express').Router({mergeParams: true});
const controller = require('../../controllers/activity_operations/resources');

router.get('/', controller.list);
router.get('/:resource_seq', controller.detail);

module.exports = router;
