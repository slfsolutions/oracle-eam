const router = require('express').Router({mergeParams: true});
const controller = require('../../controllers/departments/resources');

router.get('/', controller.list);
router.get('/:resource_id', controller.detail);

module.exports = router;
