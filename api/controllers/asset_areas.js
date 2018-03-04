const oracledb = require('oracledb');
const controller = require('./_library');

/*
* URI query field / column mappings
*/

const fields = [
  {name: 'organization_id', column: {expression: 'asar.organization_id', type: oracledb.NUMBER}},
  {name: 'organization', column: {expression: 'orga.organization'}},
  {name: 'organization_name', column: {expression: 'orga.organization_name'}},
  {name: 'area_id', column: {expression: 'asar.area_id', type: oracledb.NUMBER}},
  {name: 'area', column: {expression: 'asar.area'}},
  {name: 'description', column: {expression: 'asar.description'}},
  {name: 'effective_from_date', column: {expression: 'asar.effective_from_date', type: oracledb.DATE}},
  {name: 'effective_to_date', column: {expression: 'asar.effective_to_date', type: oracledb.DATE}},
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
  controller.list(request.query, fields, fromClause, keys, response);
}; /* END list */

module.exports.detail = function(request, response, next) {
  const keys = {
    area_id: parseInt(request.params.area_id)
  };
  controller.detail(fields, fromClauseWithKey, keys, response);
}; /* END detail */
