const router = require('express').Router();
const controller = require('../controllers/activity_types');

router.get('/', controller.list);
router.get('/:activity_type_code', controller.detail);

module.exports = router;
