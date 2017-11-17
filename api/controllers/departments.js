const oracledb = require('oracledb');
const controllers = require('./_library');

/*
* URI query field / (reporting) object mappings
*/

const fields = [
  {name: 'organization_id', object: {alias: 'dept', column: 'organization_id', type: oracledb.NUMBER}},
  {name: 'organization', object: {alias: 'orga', column: 'organization'}},
  {name: 'organization_name', object: {alias: 'orga', column: 'organization_name'}},
  {name: 'department_id', object: {alias: 'dept', column: 'department_id', type: oracledb.NUMBER}},
  {name: 'department', object: {alias: 'dept', column: 'department'}},
  {name: 'description', object: {alias: 'dept', column: 'description'}},
  {name: 'inactive_on', object: {alias: 'dept', column: 'inactive_on', type: oracledb.DATE}},
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
  controllers.list(request.query, fields, fromClause, keys, response);
}; /* END list */

module.exports.detail = function(request, response, next) {
  const keys = {
    department_id: parseInt(request.params.department_id)
  };
  controllers.detail(fields, fromClauseWithKey, keys, response);
}; /* END detail */
