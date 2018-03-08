const router = require('express').Router();
const controller = require('../controllers/asset_attachments');

router.get('/', controller.list);
router.get('/:attachment_id', controller.detail);

module.exports = router;
