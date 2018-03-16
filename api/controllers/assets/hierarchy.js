const oracledb = require('oracledb');
const controller = require('../_library');

/*
* URI query field / column mappings
*/

const fields = [
  {name: 'organization_id', column: {expression: 'organization_id', type: oracledb.NUMBER}},
  {name: 'organization', column: {expression: 'organization'}},
  {name: 'level_number', column: {expression: 'level_number', type: oracledb.NUMBER}},
  {name: 'asset_id', column: {expression: 'asset_id', type: oracledb.NUMBER}},
  {name: 'asset_type', column: {expression: 'asset_type'}},
  {name: 'asset_number', column: {expression: 'asset_number'}},
  {name: 'parent_asset_number', column: {expression: 'parent_asset_number'}},
  {name: 'asset_path', column: {expression: 'asset_path'}},
  {name: 'asset_description', column: {expression: 'asset_description'}},
  {name: 'asset_object_id', column: {expression: 'asset_object_id', type: oracledb.NUMBER}},
  {name: 'asset_order', column: {expression: 'asset_order', type: oracledb.NUMBER}},
]; // END fields

/*
* SQL SELECT statement
*/

const fromClause =
  ' FROM    TABLE(apps.xeam_reporting_pkg.asset_hierarchy_tf(:ancestor_asset_id))\n' +
  ' WHERE   1 = 1\n';

  const fromClauseWithKey = fromClause +
  ' AND     asset_id = :asset_id\n';

/*
* Controllers
*/

module.exports.list = function(request, response, next) {
  const keys = {
    ancestor_asset_id: parseInt(request.params.ancestor_asset_id)
  };
  controller.list(request.query, fields, fromClause, keys, response);
}; /* END list */

module.exports.detail = function(request, response, next) {
  const keys = {
    ancestor_asset_id: parseInt(request.params.ancestor_asset_id),
    asset_id: parseInt(request.params.asset_id)
  };
  controller.detail(fields, fromClauseWithKey, keys, response);
}; /* END detail */
