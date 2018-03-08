const router = require('express').Router({mergeParams: true});
const controller = require('../../../controllers/organizations/activities');

router.get('/', controller.list);
router.get('/:activity_id', controller.detail);
router.use('/:activity_id/assets', require('./assets'));
router.use('/:activity_id/bom', require('./bom'));

module.exports = router;
