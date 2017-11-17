const oracledb = require('oracledb');
const controllers = require('./_library');

/*
* URI query field / (reporting) object mappings
*/

const fields = [
  {name: 'item_type_code', object: {alias: 'asgr', column: 'item_type_code', type: oracledb.NUMBER}},
  {name: 'item_type', object: {alias: 'asgr', column: 'item_type'}},
  {name: 'asset_group_id', object: {alias: 'asgr', column: 'asset_group_id', type: oracledb.NUMBER}},
  {name: 'asset_group', object: {alias: 'asgr', column: 'asset_group'}},
  {name: 'description', object: {alias: 'asgr', column: 'description'}},
]; // END fields

/*
* SQL SELECT statement
*/

const fromClause =
  ' FROM    apps.xeam_asset_groups_v asgr\n' +
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
  controllers.list(request.query, fields, fromClause, keys, response);
}; /* END list */

module.exports.detail = function(request, response, next) {
  const keys = {
    organization_id: parseInt(request.params.organization_id),
    asset_group_id: parseInt(request.params.asset_group_id)
  };
  controllers.detail(fields, fromClauseWithKey, keys, response);
}; /* END detail */
