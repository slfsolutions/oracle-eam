const oracledb = require('oracledb');
const controller = require('../_library');

/*
* URI query field / column mappings
*/

const fields = [
  {name: 'api_id', column: {expression: 'reap.api_id', type: oracledb.NUMBER}},
  {name: 'api_name', column: {expression: 'apis.name'}},
  {name: 'responsibility_id', column: {expression: 'reap.responsibility_id', type: oracledb.NUMBER}},
  {name: 'responsibility_name', column: {expression: 'resp.name'}},
]; // END fields

/*
* SQL SELECT statement
*/

const fromClause =
  ' FROM    apps.xeam_responsibility_apis_v reap\n' +
  '         JOIN apps.xeam_apis_v apis ON apis.api_id = reap.api_id\n' +
  '         JOIN apps.xeam_responsibilities_v resp ON resp.responsibility_id = reap.responsibility_id\n' +
  ' WHERE   reap.api_id = :api_id\n';

const fromClauseWithKey = fromClause +
  ' AND     reap.responsibility_id = :responsibility_id\n';

/*
* Controllers
*/

module.exports.list = function(request, response, next) {
  const keys = {
    api_id: parseInt(request.params.api_id)
  };
  controller.list(request, fields, fromClause, keys, response);
}; /* END list */

module.exports.detail = function(request, response, next) {
  const keys = {
    api_id: parseInt(request.params.api_id),
    responsibility_id: parseInt(request.params.responsibility_id)
  };
  controller.detail(request, fields, fromClauseWithKey, keys, response);
}; /* END detail */
