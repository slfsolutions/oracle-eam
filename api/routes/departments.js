const router = require('express').Router();
const controller = require('../controllers/departments');

router.get('/', controller.list);
router.get('/:department_id', controller.detail);

module.exports = router;
