const oracledb = require('oracledb');
const controller = require('./_library');

/*
* URI query field / column mappings
*/

const fields = [
  {name: 'rule_id', column: {expression: 'pmld.rule_id', type: oracledb.NUMBER}},
  {name: 'pm_schedule_id', column: {expression: 'pmld.pm_schedule_id', type: oracledb.NUMBER}},
  {name: 'schedule_name', column: {expression: 'pmsc.schedule_name'}},
  {name: 'list_date', column: {expression: 'pmld.list_date', type: oracledb.DATE}},
  {name: 'description', column: {expression: 'pmld.description'}},
]; // END fields

/*
* SQL SELECT statement
*/

const fromClause =
  ' FROM    apps.xeam_pm_list_dates_v pmld\n' +
  '         JOIN apps.xeam_pm_schedules_v pmsc ON pmsc.pm_schedule_id = pmld.pm_schedule_id\n' +
  ' WHERE   1 = 1\n';

const fromClauseWithKey = fromClause +
  ' AND     pmld.rule_id = :rule_id\n';

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
