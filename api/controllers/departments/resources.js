const oracledb = require('oracledb');
const controller = require('../_library');

/*
* URI query field / column mappings
*/

const fields = [
  {name: 'organization_id', column: {expression: 'depr.organization_id', type: oracledb.NUMBER}},
  {name: 'organization', column: {expression: 'orga.organization'}},
  {name: 'organization_name', column: {expression: 'orga.organization_name'}},
  {name: 'department_id', column: {expression: 'depr.department_id', type: oracledb.NUMBER}},
  {name: 'department', column: {expression: 'dept.department'}},
  {name: 'department_description', column: {expression: 'dept.description'}},
  {name: 'resource_id', column: {expression: 'depr.resource_id', type: oracledb.NUMBER}},
  {name: 'resource_code', column: {expression: 'reso.resource_code'}},
  {name: 'resource_description', column: {expression: 'reso.description'}},
  {name: 'capacity_units', column: {expression: 'depr.capacity_units', type: oracledb.NUMBER}},
  {name: 'available_24_hours_flag', column: {expression: 'depr.available_24_hours_flag'}},
  {name: 'share_resource_flag', column: {expression: 'depr.share_resource_flag'}},
  {name: 'share_from_department_id', column: {expression: 'depr.share_from_department_id', type: oracledb.NUMBER}},
  {name: 'share_from_department', column: {expression: 'dept_sf.department'}},
  {name: 'share_from_department_desc', column: {expression: 'dept_sf.description'}},
]; // END fields

/*
* SQL SELECT statement
*/

const fromClause =
  ' FROM    apps.xeam_department_resources_v depr\n' +
  '         JOIN apps.xeam_organizations_v orga ON orga.organization_id = depr.organization_id\n' +
  '         JOIN apps.xeam_departments_v dept ON dept.department_id = depr.department_id\n' +
  '         JOIN apps.xeam_resources_v reso ON reso.resource_id = depr.resource_id\n' +
  '         LEFT JOIN apps.xeam_departments_v dept_sf ON dept_sf.department_id = depr.share_from_department_id\n' +
  ' WHERE   depr.department_id = :department_id\n';

const fromClauseWithKey = fromClause +
  ' AND     depr.resource_id = :resource_id\n';

/*
* Controllers
*/

module.exports.list = function(request, response, next) {
  const keys = {
    department_id: parseInt(request.params.department_id)
  };
  controller.list(request.query, fields, fromClause, keys, response);
}; /* END list */

module.exports.detail = function(request, response, next) {
  const keys = {
    department_id: parseInt(request.params.department_id),
    resource_id: parseInt(request.params.resource_id)
  };
  controller.detail(fields, fromClauseWithKey, keys, response);
}; /* END detail */
