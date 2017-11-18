const router = require('express').Router();
const controller = require('../controllers/assets');

router.route('/').get(controller.list).post(controller.create);
router.route('/:asset_id').get(controller.detail).patch(controller.update);
router.get('/:asset_id/deactivate', controller.deactivate);
router.get('/:asset_id/hierarchy', controller.hierarchy);
router.get('/:asset_id/ancestry', controller.ancestry);

module.exports = router;
