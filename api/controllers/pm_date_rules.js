const oracledb = require('oracledb');
const controller = require('./_library');

/*
* URI query field / column mappings
*/

const fields = [
  {name: 'rule_id', column: {expression: 'pmdr.rule_id', type: oracledb.NUMBER}},
  {name: 'pm_schedule_id', column: {expression: 'pmdr.pm_schedule_id', type: oracledb.NUMBER}},
  {name: 'schedule_name', column: {expression: 'pmsc.schedule_name'}},
  {name: 'effective_from_date', column: {expression: 'pmdr.effective_from_date', type: oracledb.DATE}},
  {name: 'effective_to_date', column: {expression: 'pmdr.effective_to_date', type: oracledb.DATE}},
  {name: 'base_interval_in_days', column: {expression: 'pmdr.base_interval_in_days', type: oracledb.NUMBER}},
]; // END fields

/*
* SQL SELECT statement
*/

const fromClause =
  ' FROM    apps.xeam_pm_date_rules_v pmdr\n' +
  '         JOIN apps.xeam_pm_schedules_v pmsc ON pmsc.pm_schedule_id = pmdr.pm_schedule_id\n' +
  ' WHERE   1 = 1\n';

const fromClauseWithKey = fromClause +
  ' AND     pmdr.rule_id = :rule_id\n';

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
