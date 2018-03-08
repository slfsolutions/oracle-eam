const oracledb = require('oracledb');
const controller = require('../_library');

/*
* URI query field / column mappings
*/

const fields = [
  {name: 'organization_id', column: {expression: 'asac.organization_id', type: oracledb.NUMBER}},
  {name: 'organization', column: {expression: 'orga.organization'}},
  {name: 'organization_name', column: {expression: 'orga.organization_name'}},
  {name: 'asset_id', column: {expression: 'asac.asset_id', type: oracledb.NUMBER}},
  {name: 'asset_number', column: {expression: 'asst.asset_number'}},
  {name: 'asset_description', column: {expression: 'asst.description'}},
  {name: 'activity_id', column: {expression: 'asac.activity_id', type: oracledb.NUMBER}},
  {name: 'activity', column: {expression: 'acti.activity'}},
  {name: 'activity_description', column: {expression: 'acti.description'}},
  {name: 'priority_code', column: {expression: 'asac.priority_code'}},
  {name: 'priority', column: {expression: 'asac.activity_type'}},
  {name: 'effective_from_date', column: {expression: 'asac.effective_from_date', type: oracledb.DATE}},
  {name: 'effective_to_date', column: {expression: 'asac.effective_to_date', type: oracledb.DATE}},
  {name: 'activity_cause_code', column: {expression: 'asac.activity_cause_code'}},
  {name: 'activity_cause', column: {expression: 'asac.activity_cause'}},
  {name: 'activity_type_code', column: {expression: 'asac.activity_type_code'}},
  {name: 'activity_type', column: {expression: 'asac.activity_type'}},
  {name: 'department_id', column: {expression: 'asac.department_id', type: oracledb.NUMBER}},
  {name: 'department', column: {expression: 'dept.department'}},
  {name: 'department_description', column: {expression: 'dept.description'}},
  {name: 'shutdown_type_code', column: {expression: 'asac.shutdown_type_code'}},
  {name: 'shutdown_type', column: {expression: 'asac.shutdown_type'}},
  {name: 'activity_source_code', column: {expression: 'asac.activity_source_code'}},
  {name: 'activity_source', column: {expression: 'asac.activity_source'}},
  {name: 'accounting_class', column: {expression: 'asac.accounting_class'}},
  {name: 'tagging_required_flag', column: {expression: 'asac.tagging_required_flag'}},
  {name: 'last_service_start_date', column: {expression: 'asac.last_service_start_date', type: oracledb.DATE}},
  {name: 'last_service_end_date', column: {expression: 'asac.last_service_end_date', type: oracledb.DATE}},
  {name: 'prev_service_start_date', column: {expression: 'asac.prev_service_start_date', type: oracledb.DATE}},
  {name: 'prev_service_end_date', column: {expression: 'asac.prev_service_end_date', type: oracledb.DATE}},
  {name: 'last_scheduled_start_date', column: {expression: 'asac.last_scheduled_start_date', type: oracledb.DATE}},
  {name: 'last_scheduled_end_date', column: {expression: 'asac.last_scheduled_end_date', type: oracledb.DATE}},
  {name: 'prev_scheduled_start_date', column: {expression: 'asac.prev_scheduled_start_date', type: oracledb.DATE}},
  {name: 'prev_scheduled_end_date', column: {expression: 'asac.prev_scheduled_end_date', type: oracledb.DATE}},
  {name: 'work_order_id', column: {expression: 'asac.work_order_id', type: oracledb.NUMBER}},
  {name: 'work_order', column: {expression: 'asac.work_order'}},
]; // END fields

/*
* SQL SELECT statement
*/

const fromClause =
  ' FROM    apps.xeam_asset_activities_v asac\n' +
  '         JOIN apps.xeam_organizations_v orga ON orga.organization_id = asac.organization_id\n' +
  '         JOIN apps.xeam_assets_v asst ON asst.asset_id = asac.asset_id\n' +
  '         JOIN apps.xeam_activities_v acti ON acti.organization_id = asac.organization_id AND acti.activity_id = asac.activity_id\n' +
  '         JOIN apps.xeam_departments_v dept ON dept.department_id = asac.department_id\n' +
  ' WHERE   asac.asset_id = :asset_id\n';

const fromClauseWithKey = fromClause +
  ' AND     asac.activity_id = :activity_id\n';

/*
* Controllers
*/

module.exports.list = function(request, response, next) {
  const keys = {
    asset_id: parseInt(request.params.asset_id)
  };
  controller.list(request.query, fields, fromClause, keys, response);
}; /* END list */

module.exports.detail = function(request, response, next) {
  const keys = {
    asset_id: parseInt(request.params.asset_id),
    activity_id: parseInt(request.params.activity_id)
  };
  controller.detail(fields, fromClauseWithKey, keys, response);
}; /* END detail */
