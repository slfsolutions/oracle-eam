const oracledb = require('oracledb');
const controller = require('./_library');

/*
* URI query field / column mappings
*/

const fields = [
  {name: 'responsibility_id', column: {expression: 'resp.responsibility_id', type: oracledb.NUMBER}},
  {name: 'name', column: {expression: 'resp.name'}},
  {name: 'accesses_flag', column: {expression: '(SELECT CASE COUNT(1) WHEN 0 THEN \'N\' ELSE \'Y\' END FROM apps.xeam_responsibility_apis_v reap WHERE reap.responsibility_id = resp.responsibility_id)'}},
]; // END fields

/*
* SQL SELECT statement
*/

const fromClause =
  ' FROM    apps.xeam_responsibilities_v resp\n' +
  ' WHERE   1 = 1\n';

const fromClauseWithKey = fromClause +
  ' AND     resp.responsibility_id = :responsibility_id\n';

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
