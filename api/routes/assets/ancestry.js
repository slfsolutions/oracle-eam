const router = require('express').Router({mergeParams: true});
const controller = require('../../controllers/assets/ancestry');

router.get('/', controller.list);
router.get('/:ancestor_asset_id', controller.detail);

module.exports = router;
