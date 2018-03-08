const oracledb = require('oracledb');
const controller = require('./_library');

/*
* URI query field / column mappings
*/

const fields = [
  {name: 'organization_id', column: {expression: 'acat.organization_id', type: oracledb.NUMBER}},
  {name: 'organization', column: {expression: 'orga.organization'}},
  {name: 'organization_name', column: {expression: 'orga.organization_name'}},
  {name: 'activity_id', column: {expression: 'acat.activity_id', type: oracledb.NUMBER}},
  {name: 'activity', column: {expression: 'acti.activity'}},
  {name: 'activity_description', column: {expression: 'acti.description'}},
  {name: 'attachment_id', column: {expression: 'acat.attachment_id', type: oracledb.NUMBER}},
  {name: 'attachment_seq', column: {expression: 'acat.attachment_seq', type: oracledb.NUMBER}},
  {name: 'document_id', column: {expression: 'acat.document_id', type: oracledb.NUMBER}},
  {name: 'start_date_active', column: {expression: 'acat.start_date_active', type: oracledb.DATE}},
  {name: 'end_date_active', column: {expression: 'acat.end_date_active', type: oracledb.DATE}},
  {name: 'category', column: {expression: 'acat.category'}},
  {name: 'title', column: {expression: 'acat.title'}},
  {name: 'description', column: {expression: 'acat.description'}},
  {name: 'data_type_id', column: {expression: 'acat.data_type_id', type: oracledb.NUMBER}},
  {name: 'data_type', column: {expression: 'acat.data_type'}},
  {name: 'short_text', column: {expression: 'acat.short_text'}},
  {name: 'long_text', column: {expression: 'acat.long_text'}},
  {name: 'url', column: {expression: 'acat.url'}},
  {name: 'file_name', column: {expression: 'acat.file_name'}},
  {name: 'file_content_type', column: {expression: 'acat.file_content_type'}},
  {name: 'usage_type', column: {expression: 'acat.usage_type'}},
  {name: 'updateable_flag', column: {expression: 'acat.updateable_flag'}},
]; // END fields

/*
* SQL SELECT statement
*/

const fromClause =
  ' FROM    apps.xeam_activity_attachs_v acat\n' +
  '         JOIN apps.xeam_organizations_v orga ON orga.organization_id = acat.organization_id\n' +
  '         JOIN apps.xeam_activities_v acti ON acti.organization_id = acat.organization_id AND acti.activity_id = acat.activity_id\n' +
  ' WHERE   1 = 1\n';

const fromClauseWithKey = fromClause +
  ' AND     acat.attachment_id = :attachment_id\n';

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
