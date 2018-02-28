const oracledb = require('oracledb');
const controller = require('../_library');

/*
* URI query field / (reporting) object mappings
*/

const fields = [
  {name: 'organization_id', object: {alias: 'asgr', column: 'organization_id', type: oracledb.NUMBER}},
  {name: 'organization', object: {alias: 'orga', column: 'organization'}},
  {name: 'organization_name', object: {alias: 'orga', column: 'organization_name'}},
  {name: 'item_type_code', object: {alias: 'asgr', column: 'item_type_code', type: oracledb.NUMBER}},
  {name: 'item_type', object: {alias: 'asgr', column: 'item_type'}},
  {name: 'asset_group_id', object: {alias: 'asgr', column: 'asset_group_id', type: oracledb.NUMBER}},
  {name: 'asset_group', object: {alias: 'asgr', column: 'asset_group'}},
  {name: 'description', object: {alias: 'asgr', column: 'description'}},
  {name: 'template_id', object: {alias: 'asgr', column: 'template_id', type: oracledb.NUMBER}},
  {name: 'template', object: {alias: 'asgr', column: 'template'}},
  {name: 'serial_generation_code', object: {alias: 'asgr', column: 'serial_generation_code', type: oracledb.NUMBER}},
  {name: 'serial_generation', object: {alias: 'asgr', column: 'serial_generation'}},
  {name: 'starting_prefix', object: {alias: 'asgr', column: 'starting_prefix'}},
  {name: 'starting_number', object: {alias: 'asgr', column: 'starting_number'}},
]; // END fields

/*
* SQL SELECT statement
*/

const fromClause =
  ' FROM    apps.xeam_asset_groups_v asgr\n' +
  '         JOIN apps.xeam_organizations_v orga ON orga.organization_id = asgr.organization_id\n' +
  ' WHERE   asgr.organization_id = :organization_id\n';

const fromClauseWithKey = fromClause +
  ' AND     asgr.asset_group_id = :asset_group_id\n';

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
    asset_group_id: parseInt(request.params.asset_group_id)
  };
  controller.detail(fields, fromClauseWithKey, keys, response);
}; /* END detail */
