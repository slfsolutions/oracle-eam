const router = require('express').Router();
const controller = require('../../controllers/master_organizations');

router.get('/', controller.list);
router.get('/:master_organization_id', controller.detail);
router.use('/:master_organization_id/activities', require('./activities'));
router.use('/:master_organization_id/asset_groups', require('./asset_groups'));
router.use('/:master_organization_id/organizations', require('./organizations'));

module.exports = router;
