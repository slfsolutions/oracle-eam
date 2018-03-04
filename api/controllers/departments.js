const oracledb = require('oracledb');
const controller = require('./_library');

/*
* URI query field / column mappings
*/

const fields = [
  {name: 'organization_id', column: {expression: 'dept.organization_id', type: oracledb.NUMBER}},
  {name: 'organization', column: {expression: 'orga.organization'}},
  {name: 'organization_name', column: {expression: 'orga.organization_name'}},
  {name: 'department_id', column: {expression: 'dept.department_id', type: oracledb.NUMBER}},
  {name: 'department', column: {expression: 'dept.department'}},
  {name: 'description', column: {expression: 'dept.description'}},
  {name: 'inactive_on', column: {expression: 'dept.inactive_on', type: oracledb.DATE}},
]; // END fields

/*
* SQL SELECT statement
*/

const fromClause =
  ' FROM    apps.xeam_departments_v dept\n' +
  '         JOIN apps.xeam_organizations_v orga ON orga.organization_id = dept.organization_id\n' +
  ' WHERE   1 = 1\n';

const fromClauseWithKey = fromClause +
  ' AND     dept.department_id = :department_id\n';

/*
* Controllers
*/

module.exports.list = function(request, response, next) {
  const keys = {};
  controller.list(request.query, fields, fromClause, keys, response);
}; /* END list */

module.exports.detail = function(request, response, next) {
  const keys = {
    department_id: parseInt(request.params.department_id)
  };
  controller.detail(fields, fromClauseWithKey, keys, response);
}; /* END detail */
