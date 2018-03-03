const router = require('express').Router();
const controller = require('../controllers/resources');

router.get('/', controller.list);
router.get('/:resource_id', controller.detail);

module.exports = router;
