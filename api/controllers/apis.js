const oracledb = require('oracledb');
const controller = require('./_library');

/*
* URI query field / column mappings
*/

const fields = [
  {name: 'api_id', column: {expression: 'apis.api_id', type: oracledb.NUMBER}},
  {name: 'name', column: {expression: 'apis.name'}},
  {name: 'accessible_flag', column: {expression: '(SELECT CASE COUNT(1) WHEN 0 THEN \'N\' ELSE \'Y\' END FROM apps.xeam_responsibility_apis_v reap WHERE reap.api_id = apis.api_id)'}},
]; // END fields

/*
* SQL SELECT statement
*/

const fromClause =
  ' FROM    apps.xeam_apis_v apis\n' +
  ' WHERE   1 = 1\n';

const fromClauseWithKey = fromClause +
  ' AND     api_id = :api_id\n';

/*
* Controllers
*/

module.exports.list = function(request, response, next) {
  const keys = {};
  controller.list(request, fields, fromClause, keys, response);
}; /* END list */

module.exports.detail = function(request, response, next) {
  const keys = {
    api_id: parseInt(request.params.api_id)
  };
  controller.detail(request, fields, fromClauseWithKey, keys, response);
}; /* END detail */
