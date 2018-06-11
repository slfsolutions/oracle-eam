const router = require('express').Router({mergeParams: true});
const controller = require('../../controllers/responsibilities/apis');

router.route('/').get(controller.list).post(controller.create);
router.route('/:api_id').get(controller.detail).delete(controller.delete);

module.exports = router;
