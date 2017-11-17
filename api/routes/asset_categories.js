const express = require('express');
const router = express.Router();
const controllers = require('../controllers/asset_categories');

router.get('/', controllers.list);
router.get('/:category_id', controllers.detail);

module.exports = router;
