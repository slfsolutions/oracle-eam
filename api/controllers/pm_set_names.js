const oracledb = require('oracledb');
const controller = require('./_library');

/*
* URI query field / column mappings
*/

const fields = [
  {name: 'pm_set_name_id', column: {expression: 'pm_set_name_id', type: oracledb.NUMBER}},
  {name: 'pm_set_name', column: {expression: 'pm_set_name'}},
  {name: 'description', column: {expression: 'description'}},
]; // END fields

/*
* SQL SELECT statement
*/

const fromClause =
  ' FROM    apps.xeam_pm_set_names_v\n' +
  ' WHERE   1 = 1\n';

const fromClauseWithKey = fromClause +
  ' AND     pm_set_name_id = :pm_set_name_id\n';

/*
* Controllers
*/

module.exports.list = function(request, response, next) {
  const keys = {};
  controller.list(request.query, fields, fromClause, keys, response);
}; /* END list */

module.exports.detail = function(request, response, next) {
  const keys = {
    pm_set_name_id: parseInt(request.params.pm_set_name_id)
  };
  controller.detail(fields, fromClauseWithKey, keys, response);
}; /* END detail */
