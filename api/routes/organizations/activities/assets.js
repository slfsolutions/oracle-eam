const router = require('express').Router({mergeParams: true});
const controller = require('../../../controllers/organizations/activities/assets');

router.get('/', controller.list);
router.get('/:asset_id', controller.detail);

module.exports = router;
