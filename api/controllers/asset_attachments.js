const oracledb = require('oracledb');
const controller = require('./_library');

/*
* URI query field / column mappings
*/

const fields = [
  {name: 'organization_id', column: {expression: 'asat.organization_id', type: oracledb.NUMBER}},
  {name: 'organization', column: {expression: 'orga.organization'}},
  {name: 'organization_name', column: {expression: 'orga.organization_name'}},
  {name: 'asset_id', column: {expression: 'asat.asset_id', type: oracledb.NUMBER}},
  {name: 'asset_number', column: {expression: 'asst.asset_number'}},
  {name: 'asset_description', column: {expression: 'asst.description'}},
  {name: 'attachment_id', column: {expression: 'asat.attachment_id', type: oracledb.NUMBER}},
  {name: 'attachment_seq', column: {expression: 'asat.attachment_seq', type: oracledb.NUMBER}},
  {name: 'document_id', column: {expression: 'asat.document_id', type: oracledb.NUMBER}},
  {name: 'start_date_active', column: {expression: 'asat.start_date_active', type: oracledb.DATE}},
  {name: 'end_date_active', column: {expression: 'asat.end_date_active', type: oracledb.DATE}},
  {name: 'category', column: {expression: 'asat.category'}},
  {name: 'title', column: {expression: 'asat.title'}},
  {name: 'description', column: {expression: 'asat.description'}},
  {name: 'data_type_id', column: {expression: 'asat.data_type_id', type: oracledb.NUMBER}},
  {name: 'data_type', column: {expression: 'asat.data_type'}},
  {name: 'short_text', column: {expression: 'asat.short_text'}},
  {name: 'long_text', column: {expression: 'asat.long_text'}},
  {name: 'url', column: {expression: 'asat.url'}},
  {name: 'file_name', column: {expression: 'asat.file_name'}},
  {name: 'file_content_type', column: {expression: 'asat.file_content_type'}},
  {name: 'usage_type', column: {expression: 'asat.usage_type'}},
  {name: 'updateable_flag', column: {expression: 'asat.updateable_flag'}},
]; // END fields

/*
* SQL SELECT statement
*/

const fromClause =
  ' FROM    apps.xeam_asset_attachs_v asat\n' +
  '         JOIN apps.xeam_organizations_v orga ON orga.organization_id = asat.organization_id\n' +
  '         JOIN apps.xeam_assets_v asst ON asst.asset_id = asat.asset_id\n' +
  ' WHERE   1 = 1\n';

const fromClauseWithKey = fromClause +
  ' AND     asat.attachment_id = :attachment_id\n';

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
