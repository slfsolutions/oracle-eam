const router = require('express').Router();
const controller = require('../../controllers/asset_routes');

router.get('/', controller.list);
router.get('/:network_asset_id', controller.detail);
router.use('/:network_asset_id/assets', require('./assets'));

module.exports = router;
