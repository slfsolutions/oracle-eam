const oracledb = require('oracledb');
const controller = require('./_library');

/*
* URI query field / column mappings
*/

const fields = [
  {name: 'organization_id', column: {expression: 'pmsc.organization_id', type: oracledb.NUMBER}},
  {name: 'organization', column: {expression: 'orga.organization'}},
  {name: 'organization_name', column: {expression: 'orga.organization_name'}},
  {name: 'pm_schedule_id', column: {expression: 'pmsc.pm_schedule_id', type: oracledb.NUMBER}},
  {name: 'schedule_name', column: {expression: 'pmsc.schedule_name'}},
  {name: 'default_flag', column: {expression: 'pmsc.default_flag'}},
  {name: 'pm_set_name_id', column: {expression: 'pmsc.pm_set_name_id', type: oracledb.NUMBER}},
  {name: 'pm_set_name', column: {expression: 'pmsn.pm_set_name'}},
  {name: 'pm_set_name_description', column: {expression: 'pmsn.description'}},
  {name: 'reschedule_manual_wo_flag', column: {expression: 'pmsc.reschedule_manual_wo_flag'}},
  {name: 'run_to_failure_flag', column: {expression: 'pmsc.run_to_failure_flag'}},
  {name: 'reviewer', column: {expression: 'pmsc.reviewer'}},
  {name: 'review_date', column: {expression: 'pmsc.review_date', type: oracledb.DATE}},
  {name: 'asset_id', column: {expression: 'pmsc.asset_id', type: oracledb.NUMBER}},
  {name: 'asset_number', column: {expression: 'asst.asset_number'}},
  {name: 'asset_description', column: {expression: 'asst.description'}},
  {name: 'schedule_type', column: {expression: 'pmsc.schedule_type'}},
  {name: 'effective_from_date', column: {expression: 'pmsc.effective_from_date', type: oracledb.DATE}},
  {name: 'effective_to_date', column: {expression: 'pmsc.effective_to_date', type: oracledb.DATE}},
  {name: 'lead_time_in_days', column: {expression: 'pmsc.lead_time_in_days', type: oracledb.NUMBER}},
  {name: 'work_order_status_id', column: {expression: 'pmsc.work_order_status_id', type: oracledb.NUMBER}},
  {name: 'work_order_status', column: {expression: 'pmsc.work_order_status'}},
  {name: 'generate_next_wo', column: {expression: 'pmsc.generate_next_wo'}},
  {name: 'scheduling_options', column: {expression: 'pmsc.scheduling_options'}},
  {name: 'base_date', column: {expression: 'pmsc.base_date', type: oracledb.DATE}},
  {name: 'base_reading', column: {expression: 'pmsc.base_reading', type: oracledb.NUMBER}},
  {name: 'suggest_next_service', column: {expression: 'pmsc.suggest_next_service'}},
  {name: 'for_multiple_rules', column: {expression: 'pmsc.for_multiple_rules'}},
  {name: 'interval_per_cycle', column: {expression: 'pmsc.interval_per_cycle', type: oracledb.NUMBER}},
  {name: 'current_cycle', column: {expression: 'pmsc.current_cycle', type: oracledb.NUMBER}},
  {name: 'current_interval_count', column: {expression: 'pmsc.current_interval_count', type: oracledb.NUMBER}},
]; // END fields

/*
* SQL SELECT statement
*/

const fromClause =
  ' FROM    apps.xeam_pm_schedules_v pmsc\n' +
  '         JOIN apps.xeam_organizations_v orga ON orga.organization_id = pmsc.organization_id\n' +
  '         JOIN apps.xeam_pm_set_names_v pmsn ON pmsn.pm_set_name_id = pmsc.pm_set_name_id\n' +
  '         JOIN apps.xeam_assets_v asst ON asst.asset_id = pmsc.asset_id\n' +
  ' WHERE   1 = 1\n';

const fromClauseWithKey = fromClause +
  ' AND     pmsc.pm_schedule_id = :pm_schedule_id\n';

/*
* Controllers
*/

module.exports.list = function(request, response, next) {
  const keys = {};
  controller.list(request.query, fields, fromClause, keys, response);
}; /* END list */

module.exports.detail = function(request, response, next) {
  const keys = {
    pm_schedule_id: parseInt(request.params.pm_schedule_id)
  };
  controller.detail(fields, fromClauseWithKey, keys, response);
}; /* END detail */
