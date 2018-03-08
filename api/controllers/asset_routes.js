const oracledb = require('oracledb');
const controller = require('./_library');

/*
* URI query field / column mappings
*/

const fields = [
  {name: 'organization_id', column: {expression: 'asst.organization_id', type: oracledb.NUMBER}},
  {name: 'organization', column: {expression: 'orga.organization'}},
  {name: 'organization_name', column: {expression: 'orga.organization_name'}},
  {name: 'asset_id', column: {expression: 'asst.asset_id', type: oracledb.NUMBER}},
  {name: 'asset_number', column: {expression: 'asst.asset_number'}},
  {name: 'description', column: {expression: 'asst.description'}},
  {name: 'asset_group_id', column: {expression: 'asst.asset_group_id', type: oracledb.NUMBER}},
  {name: 'asset_group', column: {expression: 'asgr.asset_group'}},
  {name: 'asset_group_description', column: {expression: 'asgr.description'}},
  {name: 'serial_number', column: {expression: 'asst.serial_number'}},
  {name: 'asset_object_id', column: {expression: 'asst.asset_object_id', type: oracledb.NUMBER}},
  {name: 'category_id', column: {expression: 'asst.category_id', type: oracledb.NUMBER}},
  {name: 'category', column: {expression: 'asca.category'}},
  {name: 'category_class', column: {expression: 'asca.class'}},
  {name: 'category_subclass', column: {expression: 'asca.subclass'}},
  {name: 'category_description', column: {expression: 'asca.description'}},
  {name: 'owning_department_id', column: {expression: 'asst.owning_department_id', type: oracledb.NUMBER}},
  {name: 'owning_department', column: {expression: 'dept.department'}},
  {name: 'owning_department_description', column: {expression: 'dept.description'}},
  {name: 'criticality_code', column: {expression: 'asst.criticality_code'}},
  {name: 'criticality', column: {expression: 'asst.criticality'}},
  {name: 'wip_accounting_class', column: {expression: 'asst.wip_accounting_class'}},
  {name: 'status_id', column: {expression: 'asst.status_id', type: oracledb.NUMBER}},
  {name: 'status', column: {expression: 'asst.status'}},
  {name: 'area_id', column: {expression: 'asst.area_id', type: oracledb.NUMBER}},
  {name: 'area', column: {expression: 'asar.area'}},
  {name: 'area_description', column: {expression: 'asar.description'}},
  {name: 'maintainable_flag', column: {expression: 'asst.maintainable_flag'}},
  {name: 'active_start_date', column: {expression: 'asst.active_start_date', type: oracledb.DATE}},
  {name: 'active_end_date', column: {expression: 'asst.active_end_date', type: oracledb.DATE}},
  {name: 'active_flag', column: {expression: 'asst.active_flag'}},
  {name: 'operation_log_enabled_flag', column: {expression: 'asst.operation_log_enabled_flag'}},
]; // END fields

/*
* SQL SELECT statement
*/

const fromClause =
  ' FROM    apps.xeam_assets_v asst\n' +
  '         JOIN apps.xeam_organizations_v orga ON orga.organization_id = asst.organization_id\n' +
  '         JOIN apps.xeam_asset_groups_v asgr ON asgr.organization_id = asst.organization_id AND asgr.asset_group_id = asst.asset_group_id\n' +
  '         LEFT JOIN apps.xeam_asset_categories_v asca ON asca.category_id = asst.category_id\n' +
  '         LEFT JOIN apps.xeam_departments_v dept ON dept.department_id = asst.owning_department_id\n' +
  '         LEFT JOIN apps.xeam_asset_areas_v asar ON asar.area_id = asst.area_id\n' +
  ' WHERE   asst.network_asset_flag = \'Y\'\n';

const fromClauseWithKey = fromClause +
  ' AND     asst.asset_id = :network_asset_id\n';

/*
* Controllers
*/

module.exports.list = function(request, response, next) {
  const keys = {};
  controller.list(request.query, fields, fromClause, keys, response);
}; /* END list */

module.exports.detail = function(request, response, next) {
  const keys = {
    network_asset_id: parseInt(request.params.network_asset_id)
  };
  controller.detail(fields, fromClauseWithKey, keys, response);
}; /* END detail */
