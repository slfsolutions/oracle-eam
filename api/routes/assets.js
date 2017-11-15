const express = require('express');
const router = express.Router();
const controllers = require('../controllers/assets');

router.get('/', controllers.list);
router.get('/:asset_id', controllers.detail);
router.post('/', controllers.create);
router.patch('/:asset_id', controllers.update);
router.get('/:asset_id/deactivate', controllers.deactivate);
router.get('/:asset_id/hierarchy', controllers.hierarchy);
router.get('/:asset_id/ancestry', controllers.ancestry);

module.exports = router;
