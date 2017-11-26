const router = require('express').Router();
const controller = require('../controllers/asset_statuses');

router.get('/', controller.list);
router.get('/:status_id', controller.detail);

module.exports = router;
