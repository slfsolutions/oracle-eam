const express = require('express');
const router = express.Router();
const controllers = require('../controllers/asset_groups');

router.get('/:organization_id/asset_groups', controllers.list);
router.get('/:organization_id/asset_groups/:asset_group_id', controllers.detail);

module.exports = router;
