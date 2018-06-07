const router = require('express').Router();
const controller = require('../../controllers/apis');

router.get('/', controller.list);
router.get('/:api_id', controller.detail);
router.use('/:api_id/responsibilities', require('./responsibilities'));

module.exports = router;
