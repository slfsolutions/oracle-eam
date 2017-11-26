const router = require('express').Router();
const controller = require('../controllers/asset_types');

router.get('/', controller.list);
router.get('/:asset_type_code', controller.detail);

module.exports = router;
