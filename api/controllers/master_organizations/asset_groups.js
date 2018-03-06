const oracledb = require('oracledb');
const controller = require('../_library');

/*
* URI query field / column mappings
*/

const fields = [
  {name: 'organization_id', column: {expression: 'asgr.organization_id', type: oracledb.NUMBER}},
  {name: 'organization', column: {expression: 'orga.organization'}},
  {name: 'organization_name', column: {expression: 'orga.organization_name'}},
  {name: 'item_type_code', column: {expression: 'asgr.item_type_code', type: oracledb.NUMBER}},
  {name: 'item_type', column: {expression: 'asgr.item_type'}},
  {name: 'asset_group_id', column: {expression: 'asgr.asset_group_id', type: oracledb.NUMBER}},
  {name: 'asset_group', column: {expression: 'asgr.asset_group'}},
  {name: 'description', column: {expression: 'asgr.description'}},
  {name: 'serial_generation_code', column: {expression: 'asgr.serial_generation_code', type: oracledb.NUMBER}},
  {name: 'serial_generation', column: {expression: 'asgr.serial_generation'}},
  {name: 'starting_prefix', column: {expression: 'asgr.starting_prefix'}},
  {name: 'starting_number', column: {expression: 'asgr.starting_number'}},
]; // END fields

/*
* SQL SELECT statement
*/

const fromClause =
  ' FROM    apps.xeam_asset_groups_v asgr\n' +
  '         JOIN apps.xeam_organizations_v orga ON orga.organization_id = asgr.organization_id\n' +
  ' WHERE   asgr.organization_id = :master_organization_id\n';

const fromClauseWithKey = fromClause +
  ' AND     asgr.asset_group_id = :asset_group_id\n';

/*
* Controllers
*/

module.exports.list = function(request, response, next) {
  const keys = {
    master_organization_id: parseInt(request.params.master_organization_id)
  };
  controller.list(request.query, fields, fromClause, keys, response);
}; /* END list */

module.exports.detail = function(request, response, next) {
  const keys = {
    master_organization_id: parseInt(request.params.master_organization_id),
    asset_group_id: parseInt(request.params.asset_group_id)
  };
  controller.detail(fields, fromClauseWithKey, keys, response);
}; /* END detail */
