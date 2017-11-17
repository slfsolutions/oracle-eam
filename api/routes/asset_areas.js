const express = require('express');
const router = express.Router();
const controllers = require('../controllers/asset_areas');

router.get('/', controllers.list);
router.get('/:area_id', controllers.detail);

module.exports = router;
