const router = require('express').Router({mergeParams: true});
const controller = require('../../../controllers/master_organizations/activities');

router.get('/', controller.list);
router.get('/:activity_id', controller.detail);
router.use('/:activity_id/organizations', require('./organizations'));

module.exports = router;
