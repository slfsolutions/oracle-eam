const router = require('express').Router({mergeParams: true});
const controller = require('../../controllers/apis/responsibilities');

router.get('/', controller.list);
router.get('/:responsibility_id', controller.detail);

module.exports = router;
