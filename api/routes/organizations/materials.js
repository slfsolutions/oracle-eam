const router = require('express').Router({mergeParams: true});
const controller = require('../../controllers/organizations/materials');

router.get('/', controller.list);
router.get('/:item_id', controller.detail);

module.exports = router;
