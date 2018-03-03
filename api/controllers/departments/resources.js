const oracledb = require('oracledb');
const controller = require('../_library');

/*
* URI query field / (reporting) object mappings
*/

const fields = [
  {name: 'organization_id', object: {alias: 'depr', column: 'organization_id', type: oracledb.NUMBER}},
  {name: 'organization', object: {alias: 'orga', column: 'organization'}},
  {name: 'organization_name', object: {alias: 'orga', column: 'organization_name'}},
  {name: 'department_id', object: {alias: 'depr', column: 'department_id', type: oracledb.NUMBER}},
  {name: 'department', object: {alias: 'dept', column: 'department'}},
  {name: 'department_description', object: {alias: 'dept', column: 'description'}},
  {name: 'resource_id', object: {alias: 'depr', column: 'resource_id', type: oracledb.NUMBER}},
  {name: 'resource_code', object: {alias: 'reso', column: 'resource_code'}},
  {name: 'resource_description', object: {alias: 'reso', column: 'description'}},
  {name: 'capacity_units', object: {alias: 'depr', column: 'capacity_units', type: oracledb.NUMBER}},
  {name: 'available_24_hours', object: {alias: 'depr', column: 'available_24_hours'}},
  {name: 'share_resource', object: {alias: 'depr', column: 'share_resource'}},
  {name: 'share_from_department_id', object: {alias: 'depr', column: 'share_from_department_id', type: oracledb.NUMBER}},
  {name: 'share_from_department', object: {alias: 'dept_sf', column: 'department'}},
  {name: 'share_from_department_desc', object: {alias: 'dept_sf', column: 'description'}},
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
