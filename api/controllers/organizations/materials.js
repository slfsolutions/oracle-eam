const oracledb = require('oracledb');
const controller = require('../_library');

/*
* URI query field / column mappings
*/

const fields = [
  {name: 'organization_id', column: {expression: 'mtrl.organization_id', type: oracledb.NUMBER}},
  {name: 'organization', column: {expression: 'orga.organization'}},
  {name: 'organization_name', column: {expression: 'orga.organization_name'}},
  {name: 'item_type_code', column: {expression: 'mtrl.item_type_code'}},
  {name: 'item_type', column: {expression: 'mtrl.item_type'}},
  {name: 'item_id', column: {expression: 'mtrl.item_id', type: oracledb.NUMBER}},
  {name: 'item', column: {expression: 'mtrl.item'}},
  {name: 'description', column: {expression: 'mtrl.description'}},
  {name: 'enabled_flag', column: {expression: 'mtrl.enabled_flag'}},
  {name: 'start_date_active', column: {expression: 'mtrl.start_date_active', type: oracledb.DATE}},
  {name: 'end_date_active', column: {expression: 'mtrl.end_date_active', type: oracledb.DATE}},
  {name: 'inventory_item_flag', column: {expression: 'mtrl.inventory_item_flag'}},
  {name: 'mtl_transactions_enabled_flag', column: {expression: 'mtrl.mtl_transactions_enabled_flag'}},
  {name: 'stock_enabled_flag', column: {expression: 'mtrl.stock_enabled_flag'}},
  {name: 'bom_enabled_flag', column: {expression: 'mtrl.bom_enabled_flag'}},
  {name: 'primary_unit_of_measure', column: {expression: 'mtrl.primary_unit_of_measure'}},
  {name: 'status_code', column: {expression: 'mtrl.status_code'}},
  {name: 'item_cost', column: {expression: 'mtrl.item_cost', type: oracledb.NUMBER}},
  {name: 'equipment_type_code', column: {expression: 'mtrl.equipment_type_code', type: oracledb.NUMBER}},
  {name: 'equipment_type', column: {expression: 'mtrl.equipment_type'}},
]; // END fields

/*
* SQL SELECT statement
*/

const fromClause =
  ' FROM    apps.xeam_materials_v mtrl\n' +
  '         JOIN apps.xeam_organizations_v orga ON orga.organization_id = mtrl.organization_id\n' +
  ' WHERE   mtrl.organization_id = :organization_id\n';

const fromClauseWithKey = fromClause +
  ' AND     mtrl.item_id = :item_id\n';

/*
* Controllers
*/

module.exports.list = function(request, response, next) {
  const keys = {
    organization_id: parseInt(request.params.organization_id)
  };
  controller.list(request.query, fields, fromClause, keys, response);
}; /* END list */

module.exports.detail = function(request, response, next) {
  const keys = {
    organization_id: parseInt(request.params.organization_id),
    item_id: parseInt(request.params.item_id)
  };
  controller.detail(fields, fromClauseWithKey, keys, response);
}; /* END detail */
