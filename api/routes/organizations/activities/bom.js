const router = require('express').Router({mergeParams: true});
const controller = require('../../../controllers/organizations/activities/bom');

router.get('/', controller.list);
router.get('/:item_seq', controller.detail);

module.exports = router;
