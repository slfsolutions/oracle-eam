const router = require('express').Router();
const controller = require('../controllers/asset_categories');

router.get('/', controller.list);
router.get('/:category_id', controller.detail);

module.exports = router;
