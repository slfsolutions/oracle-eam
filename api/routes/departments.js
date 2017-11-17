const express = require('express');
const router = express.Router();
const controllers = require('../controllers/departments');

router.get('/', controllers.list);
router.get('/:department_id', controllers.detail);

module.exports = router;
