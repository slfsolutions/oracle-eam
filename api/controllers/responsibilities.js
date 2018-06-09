const oracledb = require('oracledb');
const controller = require('./_library');

/*
* URI query field / column mappings
*/

const fields = [
  {name: 'responsibility_id', column: {expression: 'responsibility_id', type: oracledb.NUMBER}},
  {name: 'name', column: {expression: 'name'}},
  {name: 'assigned_flag', column: {expression: 'assigned_flag'}},
  {name: 'apis_flag', column: {expression: 'apis_flag'}},
  {name: 'api_count', column: {expression: 'api_count', type: oracledb.NUMBER}},
]; // END fields

/*
* SQL SELECT statement
*/

const fromClause =
  ' FROM    apps.xeam_responsibilities_v\n' +
  ' WHERE   1 = 1\n';

const fromClauseWithKey = fromClause +
  ' AND     responsibility_id = :responsibility_id\n';

/*
* Controllers
*/

module.exports.list = function(request, response, next) {
  const keys = {};
  controller.list(request, fields, fromClause, keys, response);
}; /* END list */

module.exports.detail = function(request, response, next) {
  const keys = {
    responsibility_id: parseInt(request.params.responsibility_id)
  };
  controller.detail(request, fields, fromClauseWithKey, keys, response);
}; /* END detail */
