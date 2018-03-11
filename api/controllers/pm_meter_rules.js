const oracledb = require('oracledb');
const controller = require('./_library');

/*
* URI query field / column mappings
*/

const fields = [
  {name: 'rule_id', column: {expression: 'pmmr.rule_id', type: oracledb.NUMBER}},
  {name: 'pm_schedule_id', column: {expression: 'pmmr.pm_schedule_id', type: oracledb.NUMBER}},
  {name: 'schedule_name', column: {expression: 'pmsc.schedule_name'}},
  {name: 'meter_id', column: {expression: 'pmmr.meter_id', type: oracledb.NUMBER}},
  {name: 'meter_name', column: {expression: 'metr.meter_name'}},
  {name: 'effective_from_reading', column: {expression: 'pmmr.effective_from_reading', type: oracledb.NUMBER}},
  {name: 'effective_to_reading', column: {expression: 'pmmr.effective_to_reading', type: oracledb.DATE}},
  {name: 'base_interval_reading', column: {expression: 'pmmr.base_interval_reading', type: oracledb.NUMBER}},
]; // END fields

/*
* SQL SELECT statement
*/

const fromClause =
  ' FROM    apps.xeam_pm_meter_rules_v pmmr\n' +
  '         JOIN apps.xeam_pm_schedules_v pmsc ON pmsc.pm_schedule_id = pmmr.pm_schedule_id\n' +
  '         JOIN apps.xeam_meters_v metr ON metr.meter_id = pmmr.meter_id\n' +
  ' WHERE   1 = 1\n';

const fromClauseWithKey = fromClause +
  ' AND     pmmr.rule_id = :rule_id\n';

/*
* Controllers
*/

module.exports.list = function(request, response, next) {
  const keys = {};
  controller.list(request.query, fields, fromClause, keys, response);
}; /* END list */

module.exports.detail = function(request, response, next) {
  const keys = {
    rule_id: parseInt(request.params.rule_id)
  };
  controller.detail(fields, fromClauseWithKey, keys, response);
}; /* END detail */
