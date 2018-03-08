const oracledb = require('oracledb');
const controller = require('../_library');

/*
* URI query field / column mappings
*/

const fields = [
  {name: 'organization_id', column: {expression: 'asro.organization_id', type: oracledb.NUMBER}},
  {name: 'organization', column: {expression: 'orga.organization'}},
  {name: 'organization_name', column: {expression: 'orga.organization_name'}},
  {name: 'network_asset_id', column: {expression: 'asro.network_asset_id', type: oracledb.NUMBER}},
  {name: 'network_asset_number', column: {expression: 'asst_network.asset_number'}},
  {name: 'network_asset_description', column: {expression: 'asst_network.description'}},
  {name: 'network_asset_group_id', column: {expression: 'asst_network.asset_group_id', type: oracledb.NUMBER}},
  {name: 'network_asset_group', column: {expression: 'asgr_network.asset_group'}},
  {name: 'network_asset_group_desc', column: {expression: 'asgr_network.description'}},
  {name: 'asset_id', column: {expression: 'asro.asset_id', type: oracledb.NUMBER}},
  {name: 'asset_number', column: {expression: 'asst.asset_number'}},
  {name: 'asset_description', column: {expression: 'asst.description'}},
  {name: 'asset_group_id', column: {expression: 'asst.asset_group_id', type: oracledb.NUMBER}},
  {name: 'asset_group', column: {expression: 'asgr.asset_group'}},
  {name: 'asset_group_desc', column: {expression: 'asgr.description'}},
  {name: 'effective_from_date', column: {expression: 'asro.effective_from_date', type: oracledb.DATE}},
  {name: 'effective_to_date', column: {expression: 'asro.effective_to_date', type: oracledb.DATE}},
]; // END fields

/*
* SQL SELECT statement
*/

const fromClause =
  ' FROM    apps.xeam_asset_routes_v asro\n' +
  '         JOIN apps.xeam_organizations_v orga ON orga.organization_id = asro.organization_id\n' +
  '         JOIN apps.xeam_assets_v asst_network ON asst_network.asset_id = asro.network_asset_id\n' +
  '         JOIN apps.xeam_asset_groups_v asgr_network ON asgr_network.organization_id = asst_network.organization_id AND asgr_network.asset_group_id = asst_network.asset_group_id\n' +
  '         JOIN apps.xeam_assets_v asst ON asst.asset_id = asro.asset_id\n' +
  '         JOIN apps.xeam_asset_groups_v asgr ON asgr.organization_id = asst.organization_id AND asgr.asset_group_id = asst.asset_group_id\n' +
  ' WHERE   asro.network_asset_id = :network_asset_id\n';

const fromClauseWithKey = fromClause +
  ' AND     asro.asset_id = :asset_id\n';

/*
* Controllers
*/

module.exports.list = function(request, response, next) {
  const keys = {
    network_asset_id: parseInt(request.params.network_asset_id)
  };
  controller.list(request.query, fields, fromClause, keys, response);
}; /* END list */

module.exports.detail = function(request, response, next) {
  const keys = {
    network_asset_id: parseInt(request.params.network_asset_id),
    asset_id: parseInt(request.params.asset_id)
  };
  controller.detail(fields, fromClauseWithKey, keys, response);
}; /* END detail */
