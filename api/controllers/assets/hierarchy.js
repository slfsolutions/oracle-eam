const oracledb = require('oracledb');
const controller = require('../_library');

/*
* URI query field / (reporting) object mappings
*/

const fields = [
  {name: 'organization_id', object: {alias: 'ashi', column: 'organization_id', type: oracledb.NUMBER}},
  {name: 'organization', object: {alias: 'ashi', column: 'organization'}},
  {name: 'level_number', object: {alias: 'ashi', column: 'level_number', type: oracledb.NUMBER}},
  {name: 'asset_id', object: {alias: 'ashi', column: 'asset_id', type: oracledb.NUMBER}},
  {name: 'asset_type', object: {alias: 'ashi', column: 'asset_type'}},
  {name: 'asset_number', object: {alias: 'ashi', column: 'asset_number'}},
  {name: 'parent_asset_number', object: {alias: 'ashi', column: 'parent_asset_number'}},
  {name: 'asset_path', object: {alias: 'ashi', column: 'asset_path'}},
  {name: 'asset_description', object: {alias: 'ashi', column: 'asset_description'}},
  {name: 'asset_object_id', object: {alias: 'ashi', column: 'asset_object_id', type: oracledb.NUMBER}},
  {name: 'asset_order', object: {alias: 'ashi', column: 'asset_order', type: oracledb.NUMBER}},
]; // END fields

/*
* SQL SELECT statement
*/

const fromClause =
  ' FROM    TABLE(apps.xeam_reporting_pkg.asset_hierarchy_tf(:asset_id)) ashi\n' +
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
