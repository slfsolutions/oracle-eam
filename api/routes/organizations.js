const express = require('express');
const router = express.Router();
const controllers = require('../controllers/organizations');

router.get('/', controllers.list);
router.get('/:organization_id', controllers.detail);

module.exports = router;
