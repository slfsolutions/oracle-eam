const router = require('express').Router();
const controller = require('../controllers/asset_areas');

router.get('/', controller.list);
router.get('/:area_id', controller.detail);

module.exports = router;
