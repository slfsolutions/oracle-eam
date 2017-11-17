const oracledb = require('oracledb');
const controllers = require('./_library');

/*
* URI query field / (reporting) object mappings
*/

const fields = [
  {name: 'organization_id', object: {alias: 'asar', column: 'organization_id', type: oracledb.NUMBER}},
  {name: 'organization', object: {alias: 'orga', column: 'organization'}},
  {name: 'organization_name', object: {alias: 'orga', column: 'organization_name'}},
  {name: 'area_id', object: {alias: 'asar', column: 'area_id', type: oracledb.NUMBER}},
  {name: 'area', object: {alias: 'asar', column: 'area'}},
  {name: 'description', object: {alias: 'asar', column: 'description'}},
  {name: 'effective_from_date', object: {alias: 'asar', column: 'effective_from_date', type: oracledb.DATE}},
  {name: 'effective_to_date', object: {alias: 'asar', column: 'effective_to_date', type: oracledb.DATE}},
]; // END fields

/*
* SQL SELECT statement
*/

const fromClause =
  ' FROM    apps.xeam_asset_areas_v asar\n' +
  '         JOIN apps.xeam_organizations_v orga ON orga.organization_id = asar.organization_id\n' +
  ' WHERE   1 = 1\n';

const fromClauseWithKey = fromClause +
  ' AND     asar.area_id = :area_id\n';

/*
* Controllers
*/

module.exports.list = function(request, response, next) {
  const keys = {};
  controllers.list(request.query, fields, fromClause, keys, response);
}; /* END list */

module.exports.detail = function(request, response, next) {
  const keys = {
    area_id: parseInt(request.params.area_id)
  };
  controllers.detail(fields, fromClauseWithKey, keys, response);
}; /* END detail */
