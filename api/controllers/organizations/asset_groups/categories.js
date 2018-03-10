const oracledb = require('oracledb');
const controller = require('../../_library');

/*
* URI query field / column mappings
*/

const fields = [
  {name: 'organization_id', column: {expression: 'asgc.organization_id', type: oracledb.NUMBER}},
  {name: 'organization', column: {expression: 'orga.organization'}},
  {name: 'organization_name', column: {expression: 'orga.organization_name'}},
  {name: 'asset_group_id', column: {expression: 'asgc.asset_group_id', type: oracledb.NUMBER}},
  {name: 'asset_group', column: {expression: 'asgr.asset_group'}},
  {name: 'description', column: {expression: 'asgr.description'}},
  {name: 'category_id', column: {expression: 'asgc.category_id', type: oracledb.NUMBER}},
  {name: 'category', column: {expression: 'asca.category'}},
  {name: 'class', column: {expression: 'asca.class'}},
  {name: 'subclass', column: {expression: 'asca.subclass'}},
  {name: 'description', column: {expression: 'asca.description'}},
]; // END fields

/*
* SQL SELECT statement
*/

const fromClause =
  ' FROM    apps.xeam_asset_group_categories_v asgc\n' +
  '         JOIN apps.xeam_organizations_v orga ON orga.organization_id = asgc.organization_id\n' +
  '         JOIN apps.xeam_asset_groups_v asgr ON asgr.organization_id = asgc.organization_id AND asgr.asset_group_id = asgc.asset_group_id\n' +
  '         JOIN apps.xeam_asset_categories_v asca ON asca.category_id = asgc.category_id\n' +
  ' WHERE   asgc.organization_id = :organization_id\n' +
  ' AND     asgc.asset_group_id = :asset_group_id\n';

const fromClauseWithKey = fromClause +
  ' AND     asgc.category_id = :category_id\n';

/*
* Controllers
*/

module.exports.list = function(request, response, next) {
  const keys = {
    organization_id: parseInt(request.params.organization_id),
    asset_group_id: parseInt(request.params.asset_group_id)
  };
  controller.list(request.query, fields, fromClause, keys, response);
}; /* END list */

module.exports.detail = function(request, response, next) {
  const keys = {
    organization_id: parseInt(request.params.organization_id),
    asset_group_id: parseInt(request.params.asset_group_id),
    category_id: parseInt(request.params.category_id)
  };
  controller.detail(fields, fromClauseWithKey, keys, response);
}; /* END detail */
