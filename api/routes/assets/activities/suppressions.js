const router = require('express').Router({mergeParams: true});
const controller = require('../../../controllers/assets/activities/suppressions');

router.get('/', controller.list);
router.get('/:suppressed_activity_id', controller.detail);

module.exports = router;
