const oracledb = require('oracledb');
const controller = require('./_library');

/*
* URI query field / column mappings
*/

const fields = [
  {name: 'category_id', column: {expression: 'category_id', type: oracledb.NUMBER}},
  {name: 'category', column: {expression: 'category'}},
  {name: 'class', column: {expression: 'class'}},
  {name: 'subclass', column: {expression: 'subclass'}},
  {name: 'description', column: {expression: 'description'}},
  {name: 'enabled_flag', column: {expression: 'enabled_flag'}},
  {name: 'inactive_on', column: {expression: 'inactive_on', type: oracledb.DATE}},
  {name: 'start_date_active', column: {expression: 'start_date_active', type: oracledb.DATE}},
  {name: 'end_date_active', column: {expression: 'end_date_active', type: oracledb.DATE}},
]; // END fields

/*
* SQL SELECT statement
*/

const fromClause =
  ' FROM    apps.xeam_asset_categories_v\n' +
  ' WHERE   1 = 1\n';

const fromClauseWithKey = fromClause +
  ' AND     category_id = :category_id\n';

/*
* Controllers
*/

module.exports.list = function(request, response, next) {
  const keys = {};
  controller.list(request.query, fields, fromClause, keys, response);
}; /* END list */

module.exports.detail = function(request, response, next) {
  const keys = {
    category_id: parseInt(request.params.category_id)
  };
  controller.detail(fields, fromClauseWithKey, keys, response);
}; /* END detail */
