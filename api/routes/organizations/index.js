const router = require('express').Router();
const controller = require('../../controllers/organizations');

router.get('/', controller.list);
router.get('/:organization_id', controller.detail);
router.use('/:organization_id/asset_groups', require('./asset_groups'));

module.exports = router;
