const router = require('express').Router();
const controller = require('../controllers/asset_criticalities');

router.get('/', controller.list);
router.get('/:criticality_code', controller.detail);

module.exports = router;
