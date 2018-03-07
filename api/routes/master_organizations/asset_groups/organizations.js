const router = require('express').Router({mergeParams: true});
const controller = require('../../../controllers/master_organizations/asset_groups/organizations');

router.get('/', controller.list);
router.get('/:organization_id', controller.detail);

module.exports = router;
