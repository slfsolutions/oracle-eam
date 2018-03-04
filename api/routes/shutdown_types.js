const router = require('express').Router();
const controller = require('../controllers/shutdown_types');

router.get('/', controller.list);
router.get('/:shutdown_type_code', controller.detail);

module.exports = router;
