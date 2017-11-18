const oracledb = require('oracledb');
const controller = require('./_library');

/*
* URI query field / (reporting) object mappings
*/

const fields = [
  {name: 'category_id', object: {alias: 'asca', column: 'category_id', type: oracledb.NUMBER}},
  {name: 'category', object: {alias: 'asca', column: 'category'}},
  {name: 'class', object: {alias: 'asca', column: 'class'}},
  {name: 'subclass', object: {alias: 'asca', column: 'subclass'}},
  {name: 'description', object: {alias: 'asca', column: 'description'}},
  {name: 'enabled_flag', object: {alias: 'asca', column: 'enabled_flag'}},
  {name: 'inactive_on', object: {alias: 'asca', column: 'inactive_on', type: oracledb.DATE}},
  {name: 'start_date_active', object: {alias: 'asca', column: 'start_date_active', type: oracledb.DATE}},
  {name: 'end_date_active', object: {alias: 'asca', column: 'end_date_active', type: oracledb.DATE}},
]; // END fields

/*
* SQL SELECT statement
*/

const fromClause =
  ' FROM    apps.xeam_asset_categories_v asca\n' +
  ' WHERE   1 = 1\n';

const fromClauseWithKey = fromClause +
  ' AND     asca.category_id = :category_id\n';

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
