const router = require('express').Router();
const controller = require('../../controllers/organizations');

router.get('/', controller.list);
router.get('/:organization_id', controller.detail);
router.use('/:organization_id/activities', require('./activities'));
router.use('/:organization_id/asset_groups', require('./asset_groups'));
router.use('/:organization_id/materials', require('./materials'));

module.exports = router;
