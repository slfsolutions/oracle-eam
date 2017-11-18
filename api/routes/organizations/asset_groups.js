const router = require('express').Router({mergeParams: true});
const controller = require('../../controllers/organizations/asset_groups');

router.get('/', controller.list);
router.get('/:asset_group_id', controller.detail);

module.exports = router;
