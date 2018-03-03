const router = require('express').Router();
const controller = require('../controllers/item_types');

router.get('/', controller.list);
router.get('/:item_type_code', controller.detail);

module.exports = router;
