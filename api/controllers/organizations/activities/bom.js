const oracledb = require('oracledb');
const controller = require('../../_library');

/*
* URI query field / column mappings
*/

const fields = [
  {name: 'organization_id', column: {expression: 'acbm.organization_id', type: oracledb.NUMBER}},
  {name: 'organization', column: {expression: 'orga.organization'}},
  {name: 'organization_name', column: {expression: 'orga.organization_name'}},
  {name: 'activity_id', column: {expression: 'acbm.activity_id', type: oracledb.NUMBER}},
  {name: 'activity', column: {expression: 'acti.activity'}},
  {name: 'activity_description', column: {expression: 'acti.description'}},
  {name: 'item_seq', column: {expression: 'acbm.item_seq', type: oracledb.NUMBER}},
  {name: 'operation_seq', column: {expression: 'acbm.operation_seq', type: oracledb.NUMBER}},
  {name: 'item_id', column: {expression: 'acbm.item_id', type: oracledb.NUMBER}},
  {name: 'item', column: {expression: 'mtrl.item'}},
  {name: 'item_description', column: {expression: 'mtrl.description'}},
  {name: 'quantity', column: {expression: 'acbm.quantity', type: oracledb.NUMBER}},
  {name: 'start_effective_date', column: {expression: 'acbm.start_effective_date', type: oracledb.DATE}},
  {name: 'end_effective_date', column: {expression: 'acbm.end_effective_date', type: oracledb.DATE}},
]; // END fields

/*
* SQL SELECT statement
*/

const fromClause =
  ' FROM    apps.xeam_activity_bom_v acbm\n' +
  '         JOIN apps.xeam_organizations_v orga ON orga.organization_id = acbm.organization_id\n' +
  '         JOIN apps.xeam_activities_v acti ON acti.organization_id = acbm.organization_id AND acti.activity_id = acbm.activity_id\n' +
  '         JOIN apps.xeam_materials_v mtrl ON mtrl.organization_id = acbm.organization_id AND mtrl.item_id = acbm.item_id\n' +
  ' WHERE   acbm.organization_id = :organization_id\n' +
  ' AND     acbm.activity_id = :activity_id\n';

const fromClauseWithKey = fromClause +
  ' AND     acbm.item_seq = :item_seq\n';

/*
* Controllers
*/

module.exports.list = function(request, response, next) {
  const keys = {
    organization_id: parseInt(request.params.organization_id),
    activity_id: parseInt(request.params.activity_id)
  };
  controller.list(request.query, fields, fromClause, keys, response);
}; /* END list */

module.exports.detail = function(request, response, next) {
  const keys = {
    organization_id: parseInt(request.params.organization_id),
    activity_id: parseInt(request.params.activity_id),
    item_seq: parseInt(request.params.item_seq)
  };
  controller.detail(fields, fromClauseWithKey, keys, response);
}; /* END detail */
