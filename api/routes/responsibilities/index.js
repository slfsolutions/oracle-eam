const router = require('express').Router();
const controller = require('../../controllers/responsibilities');

router.get('/', controller.list);
router.get('/:responsibility_id', controller.detail);
router.use('/:responsibility_id/apis', require('./apis'));

module.exports = router;
