const oracledb = require('oracledb');
const controller = require('./_library');

/*
* URI query field / column mappings
*/

const fields = [
  {name: 'organization_id', column: {expression: 'acoa.organization_id', type: oracledb.NUMBER}},
  {name: 'organization', column: {expression: 'orga.organization'}},
  {name: 'organization_name', column: {expression: 'orga.organization_name'}},
  {name: 'activity_id', column: {expression: 'acoa.activity_id', type: oracledb.NUMBER}},
  {name: 'activity', column: {expression: 'acti.activity'}},
  {name: 'activity_description', column: {expression: 'acti.description'}},
  {name: 'operation_id', column: {expression: 'acoa.operation_id', type: oracledb.NUMBER}},
  {name: 'operation_seq', column: {expression: 'acop.operation_seq', type: oracledb.NUMBER}},
  {name: 'operation_description', column: {expression: 'acop.description'}},
  {name: 'attachment_id', column: {expression: 'acoa.attachment_id', type: oracledb.NUMBER}},
  {name: 'attachment_seq', column: {expression: 'acoa.attachment_seq', type: oracledb.NUMBER}},
  {name: 'document_id', column: {expression: 'acoa.document_id', type: oracledb.NUMBER}},
  {name: 'start_date_active', column: {expression: 'acoa.start_date_active', type: oracledb.DATE}},
  {name: 'end_date_active', column: {expression: 'acoa.end_date_active', type: oracledb.DATE}},
  {name: 'category', column: {expression: 'acoa.category'}},
  {name: 'title', column: {expression: 'acoa.title'}},
  {name: 'description', column: {expression: 'acoa.description'}},
  {name: 'data_type_id', column: {expression: 'acoa.data_type_id', type: oracledb.NUMBER}},
  {name: 'data_type', column: {expression: 'acoa.data_type'}},
  {name: 'short_text', column: {expression: 'acoa.short_text'}},
  {name: 'long_text', column: {expression: 'acoa.long_text'}},
  {name: 'url', column: {expression: 'acoa.url'}},
  {name: 'file_name', column: {expression: 'acoa.file_name'}},
  {name: 'file_content_type', column: {expression: 'acoa.file_content_type'}},
  {name: 'usage_type', column: {expression: 'acoa.usage_type'}},
  {name: 'updateable_flag', column: {expression: 'acoa.updateable_flag'}},
]; // END fields

/*
* SQL SELECT statement
*/

const fromClause =
  ' FROM    apps.xeam_activity_op_attachs_v acoa\n' +
  '         JOIN apps.xeam_organizations_v orga ON orga.organization_id = acoa.organization_id\n' +
  '         JOIN apps.xeam_activities_v acti ON acti.organization_id = acoa.organization_id AND acti.activity_id = acoa.activity_id\n' +
  '         JOIN apps.xeam_activity_operations_v acop ON acop.operation_id = acoa.operation_id\n' +
  ' WHERE   1 = 1\n';

const fromClauseWithKey = fromClause +
  ' AND     acoa.attachment_id = :attachment_id\n';

/*
* Controllers
*/

module.exports.list = function(request, response, next) {
  const keys = {};
  controller.list(request.query, fields, fromClause, keys, response);
}; /* END list */

module.exports.detail = function(request, response, next) {
  const keys = {
    attachment_id: parseInt(request.params.attachment_id)
  };
  controller.detail(fields, fromClauseWithKey, keys, response);
}; /* END detail */
