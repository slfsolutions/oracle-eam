const oracledb = require('oracledb');
const controller = require('./_library');

/*
* URI query field / column mappings
*/

const fields = [
  {name: 'organization_id', column: {expression: 'acop.organization_id', type: oracledb.NUMBER}},
  {name: 'organization', column: {expression: 'orga.organization'}},
  {name: 'organization_name', column: {expression: 'orga.organization_name'}},
  {name: 'activity_id', column: {expression: 'acop.activity_id', type: oracledb.NUMBER}},
  {name: 'activity', column: {expression: 'acti.activity'}},
  {name: 'activity_description', column: {expression: 'acti.description'}},
  {name: 'operation_id', column: {expression: 'acop.operation_id', type: oracledb.NUMBER}},
  {name: 'operation_seq', column: {expression: 'acop.operation_seq', type: oracledb.NUMBER}},
  {name: 'predecessor', column: {expression: 'acop.predecessor', type: oracledb.NUMBER}},
  {name: 'department_id', column: {expression: 'acop.department_id', type: oracledb.NUMBER}},
  {name: 'department', column: {expression: 'dept.department'}},
  {name: 'department_description', column: {expression: 'dept.description'}},
  {name: 'disable_date', column: {expression: 'acop.disable_date', type: oracledb.DATE}},
  {name: 'shutdown_type_code', column: {expression: 'acop.shutdown_type_code'}},
  {name: 'shutdown_type', column: {expression: 'acop.shutdown_type'}},
  {name: 'description', column: {expression: 'acop.description'}},
  {name: 'long_description', column: {expression: 'acop.long_description'}},
]; // END fields

/*
* SQL SELECT statement
*/

const fromClause =
  ' FROM    apps.xeam_activity_operations_v acop\n' +
  '         JOIN apps.xeam_organizations_v orga ON orga.organization_id = acop.organization_id\n' +
  '         JOIN apps.xeam_activities_v acti ON acti.organization_id = acop.organization_id AND acti.activity_id = acop.activity_id\n' +
  '         JOIN apps.xeam_departments_v dept ON dept.department_id = acop.department_id\n' +
  ' WHERE   1 = 1\n';

const fromClauseWithKey = fromClause +
  ' AND     acop.operation_id = :operation_id\n';

/*
* Controllers
*/

module.exports.list = function(request, response, next) {
  const keys = {};
  controller.list(request.query, fields, fromClause, keys, response);
}; /* END list */

module.exports.detail = function(request, response, next) {
  const keys = {
    operation_id: parseInt(request.params.operation_id)
  };
  controller.detail(fields, fromClauseWithKey, keys, response);
}; /* END detail */
