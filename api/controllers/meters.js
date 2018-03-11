const oracledb = require('oracledb');
const controller = require('./_library');

/*
* URI query field / column mappings
*/

const fields = [
  {name: 'meter_id', column: {expression: 'meter_id', type: oracledb.NUMBER}},
  {name: 'meter_name', column: {expression: 'meter_name'}},
  {name: 'start_date_active', column: {expression: 'start_date_active', type: oracledb.DATE}},
  {name: 'end_date_active', column: {expression: 'end_date_active', type: oracledb.DATE}},
  {name: 'active_flag', column: {expression: 'active_flag'}},
]; // END fields

/*
* SQL SELECT statement
*/

const fromClause =
  ' FROM    apps.xeam_meters_v\n' +
  ' WHERE   1 = 1\n';

const fromClauseWithKey = fromClause +
  ' AND     meter_id = :meter_id\n';

/*
* Controllers
*/

module.exports.list = function(request, response, next) {
  const keys = {};
  controller.list(request.query, fields, fromClause, keys, response);
}; /* END list */

module.exports.detail = function(request, response, next) {
  const keys = {
    meter_id: parseInt(request.params.meter_id)
  };
  controller.detail(fields, fromClauseWithKey, keys, response);
}; /* END detail */
