const router = require('express').Router();

router.use('/activity_causes', require('./activity_causes'));
router.use('/activity_operations', require('./activity_operations'));
router.use('/activity_sources', require('./activity_sources'));
router.use('/activity_types', require('./activity_types'));
router.use('/asset_areas', require('./asset_areas'));
router.use('/asset_categories', require('./asset_categories'));
router.use('/asset_criticalities', require('./asset_criticalities'));
router.use('/asset_statuses', require('./asset_statuses'));
router.use('/asset_types', require('./asset_types'));
router.use('/assets', require('./assets'));
router.use('/departments', require('./departments'));
router.use('/item_types', require('./item_types'));
router.use('/organizations', require('./organizations'));
router.use('/query', require('./query'));
router.use('/resources', require('./resources'));
router.use('/shutdown_types', require('./shutdown_types'));

module.exports = router;
