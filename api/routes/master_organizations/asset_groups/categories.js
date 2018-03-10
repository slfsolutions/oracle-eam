const router = require('express').Router({mergeParams: true});
const controller = require('../../../controllers/master_organizations/asset_groups/categories');

router.get('/', controller.list);
router.get('/:category_id', controller.detail);

module.exports = router;
