const oracledb = require('oracledb');
const controller = require('../_library');

/*
* URI query field / (reporting) object mappings
*/

const fields = [
  {name: 'organization_id', object: {alias: 'asan', column: 'organization_id', type: oracledb.NUMBER}},
  {name: 'organization', object: {alias: 'asan', column: 'organization'}},
  {name: 'asset_id', object: {alias: 'asan', column: 'asset_id', type: oracledb.NUMBER}},
  {name: 'asset_type', object: {alias: 'asan', column: 'asset_type'}},
  {name: 'asset_number', object: {alias: 'asan', column: 'asset_number'}},
  {name: 'asset_description', object: {alias: 'asan', column: 'asset_description'}},
  {name: 'asset_object_id', object: {alias: 'asan', column: 'asset_object_id', type: oracledb.NUMBER}},
  {name: 'ancestor_asset_id', object: {alias: 'asan', column: 'ancestor_asset_id', type: oracledb.NUMBER}},
  {name: 'ancestor_asset_type', object: {alias: 'asan', column: 'ancestor_asset_type'}},
  {name: 'ancestor_asset_number', object: {alias: 'asan', column: 'ancestor_asset_number'}},
  {name: 'ancestor_asset_description', object: {alias: 'asan', column: 'ancestor_asset_description'}},
  {name: 'ancestor_asset_object_id', object: {alias: 'asan', column: 'ancestor_asset_object_id', type: oracledb.NUMBER}},
  {name: 'relation_level', object: {alias: 'asan', column: 'relation_level', type: oracledb.NUMBER}},
]; // END fields

/*
* SQL SELECT statement
*/

const fromClause =
  ' FROM    TABLE(apps.xeam_reporting_pkg.asset_ancestry_tf(:asset_id)) asan\n' +
  ' WHERE   1 = 1\n';

/*
* Controllers
*/

module.exports.list = function(request, response, next) {
  const keys = {
    asset_id: parseInt(request.params.asset_id)
  };
  controller.list(request.query, fields, fromClause, keys, response);
}; /* END list */
