const router = require('express').Router();

router.use('/asset_areas', require('./asset_areas'));
router.use('/asset_categories', require('./asset_categories'));
router.use('/asset_criticalities', require('./asset_criticalities'));
router.use('/asset_statuses', require('./asset_statuses'));
router.use('/asset_types', require('./asset_types'));
router.use('/assets', require('./assets'));
router.use('/departments', require('./departments'));
router.use('/organizations', require('./organizations'));

module.exports = router;
