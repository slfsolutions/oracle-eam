const oracledb = require('oracledb');
const controller = require('../_library');

/*
* URI query field / column mappings
*/

const fields = [
  {name: 'organization_id', column: {expression: 'acre.organization_id', type: oracledb.NUMBER}},
  {name: 'organization', column: {expression: 'orga.organization'}},
  {name: 'organization_name', column: {expression: 'orga.organization_name'}},
  {name: 'activity_id', column: {expression: 'acre.activity_id', type: oracledb.NUMBER}},
  {name: 'activity', column: {expression: 'acti.activity'}},
  {name: 'activity_description', column: {expression: 'acti.description'}},
  {name: 'operation_id', column: {expression: 'acre.operation_id', type: oracledb.NUMBER}},
  {name: 'operation_seq', column: {expression: 'acop.operation_seq', type: oracledb.NUMBER}},
  {name: 'operation_description', column: {expression: 'acop.description'}},
  {name: 'resource_seq', column: {expression: 'acre.resource_seq', type: oracledb.NUMBER}},
  {name: 'resource_id', column: {expression: 'acre.resource_id', type: oracledb.NUMBER}},
  {name: 'resource_code', column: {expression: 'reso.resource_code'}},
  {name: 'resource_description', column: {expression: 'reso.description'}},
  {name: 'usage_rate_or_amount', column: {expression: 'acre.usage_rate_or_amount', type: oracledb.NUMBER}},
  {name: 'assigned_units', column: {expression: 'acre.assigned_units', type: oracledb.NUMBER}},
  {name: 'schedule_flag', column: {expression: 'acre.schedule_flag'}},
]; // END fields

/*
* SQL SELECT statement
*/

const fromClause =
  ' FROM    apps.xeam_activity_resources_v acre\n' +
  '         JOIN apps.xeam_organizations_v orga ON orga.organization_id = acre.organization_id\n' +
  '         JOIN apps.xeam_activities_v acti ON acti.organization_id = acre.organization_id AND acti.activity_id = acre.activity_id\n' +
  '         JOIN apps.xeam_activity_operations_v acop ON acop.operation_id = acre.operation_id\n' +
  '         JOIN apps.xeam_resources_v reso ON reso.resource_id = acre.resource_id\n' +
  ' WHERE   acre.operation_id = :operation_id\n';

const fromClauseWithKey = fromClause +
  ' AND     acre.resource_seq = :resource_seq\n';

/*
* Controllers
*/

module.exports.list = function(request, response, next) {
  const keys = {
    operation_id: parseInt(request.params.operation_id)
  };
  controller.list(request.query, fields, fromClause, keys, response);
}; /* END list */

module.exports.detail = function(request, response, next) {
  const keys = {
    operation_id: parseInt(request.params.operation_id),
    resource_seq: parseInt(request.params.resource_seq)
  };
  controller.detail(fields, fromClauseWithKey, keys, response);
}; /* END detail */
