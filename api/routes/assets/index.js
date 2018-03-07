const router = require('express').Router();
const controller = require('../../controllers/assets');

router.route('/').get(controller.list).post(controller.create);
router.route('/:asset_id').get(controller.detail).patch(controller.update);
router.get('/:asset_id/deactivate', controller.deactivate);
router.use('/:asset_id/activities', require('./activities'));
router.use('/:asset_id/ancestry', require('./ancestry'));
router.use('/:asset_id/hierarchy', require('./hierarchy'));

module.exports = router;
