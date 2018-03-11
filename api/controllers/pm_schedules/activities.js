const oracledb = require('oracledb');
const controller = require('../_library');

/*
* URI query field / column mappings
*/

const fields = [
  {name: 'organization_id', column: {expression: 'pmac.organization_id', type: oracledb.NUMBER}},
  {name: 'organization', column: {expression: 'orga.organization'}},
  {name: 'organization_name', column: {expression: 'orga.organization_name'}},
  {name: 'pm_schedule_id', column: {expression: 'pmac.pm_schedule_id', type: oracledb.NUMBER}},
  {name: 'schedule_name', column: {expression: 'pmsc.schedule_name'}},
  {name: 'asset_id', column: {expression: 'pmac.asset_id', type: oracledb.NUMBER}},
  {name: 'asset_number', column: {expression: 'asst.asset_number'}},
  {name: 'asset_description', column: {expression: 'asst.description'}},
  {name: 'activity_id', column: {expression: 'pmac.activity_id', type: oracledb.NUMBER}},
  {name: 'activity', column: {expression: 'acti.activity'}},
  {name: 'activity_description', column: {expression: 'acti.description'}},
  {name: 'interval_multiple', column: {expression: 'pmac.interval_multiple', type: oracledb.NUMBER}},
  {name: 'repeat_in_cycle', column: {expression: 'pmac.repeat_in_cycle'}},
  {name: 'last_service_start_date', column: {expression: 'pmac.last_service_start_date', type: oracledb.DATE}},
  {name: 'last_service_end_date', column: {expression: 'pmac.last_service_end_date', type: oracledb.DATE}},
  {name: 'last_scheduled_start_date', column: {expression: 'pmac.last_scheduled_start_date', type: oracledb.DATE}},
  {name: 'last_scheduled_end_date', column: {expression: 'pmac.last_scheduled_end_date', type: oracledb.DATE}},
  {name: 'effective_from_date', column: {expression: 'pmac.effective_from_date', type: oracledb.DATE}},
  {name: 'effective_to_date', column: {expression: 'pmac.effective_to_date', type: oracledb.DATE}},
]; // END fields

/*
* SQL SELECT statement
*/

const fromClause =
  ' FROM    apps.xeam_pm_activities_v pmac\n' +
  '         JOIN apps.xeam_organizations_v orga ON orga.organization_id = pmac.organization_id\n' +
  '         JOIN apps.xeam_pm_schedules_v pmsc ON pmsc.pm_schedule_id = pmac.pm_schedule_id\n' +
  '         JOIN apps.xeam_assets_v asst ON asst.asset_id = pmac.asset_id\n' +
  '         JOIN apps.xeam_activities_v acti ON acti.organization_id = pmac.organization_id AND acti.activity_id = pmac.activity_id\n' +
  ' WHERE   pmac.pm_schedule_id = :pm_schedule_id\n';

const fromClauseWithKey = fromClause +
  ' AND     pmac.activity_id = :activity_id\n';

/*
* Controllers
*/

module.exports.list = function(request, response, next) {
  const keys = {
    pm_schedule_id: parseInt(request.params.pm_schedule_id)
  };
  controller.list(request.query, fields, fromClause, keys, response);
}; /* END list */

module.exports.detail = function(request, response, next) {
  const keys = {
    pm_schedule_id: parseInt(request.params.pm_schedule_id),
    activity_id: parseInt(request.params.activity_id)
  };
  controller.detail(fields, fromClauseWithKey, keys, response);
}; /* END detail */
