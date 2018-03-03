const oracledb = require('oracledb');
const controller = require('./_library');

/*
* URI query field / (reporting) object mappings
*/

const fields = [
  {name: 'item_type_code', object: {column: 'code'}},
  {name: 'item_type', object: {column: 'meaning'}},
  {name: 'description', object: {column: 'description'}},
]; // END fields

/*
* SQL SELECT statement
*/

const fromClause =
  ' FROM    apps.xeam_lookup_values_v\n' +
  ' WHERE   lookup_type = \'MTL_EAM_ITEM_TYPE\'\n';

const fromClauseWithKey = fromClause +
  ' AND     code = :item_type_code\n';

/*
* Controllers
*/

module.exports.list = function(request, response, next) {
  const keys = {};
  controller.list(request.query, fields, fromClause, keys, response);
}; /* END list */

module.exports.detail = function(request, response, next) {
  const keys = {
    asset_type_code: request.params.asset_type_code
  };
  controller.detail(fields, fromClauseWithKey, keys, response);
}; /* END detail */
