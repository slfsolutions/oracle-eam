const router = require('express').Router({mergeParams: true});
const controller = require('../../controllers/assets/meters');

router.get('/', controller.list);
router.get('/:meter_id', controller.detail);

module.exports = router;
