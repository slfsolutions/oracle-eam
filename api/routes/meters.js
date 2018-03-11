const router = require('express').Router();
const controller = require('../controllers/meters');

router.get('/', controller.list);
router.get('/:meter_id', controller.detail);

module.exports = router;
