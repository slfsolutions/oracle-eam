const oracledb = require('oracledb');
const controller = require('./_library');

/*
* URI query field / column mappings
*/

const fields = [
  {name: 'item_type_code', column: {expression: 'TO_NUMBER(code)', type: oracledb.NUMBER}},
  {name: 'item_type', column: {expression: 'meaning'}},
  {name: 'description', column: {expression: 'description'}},
  {name: 'tag', column: {expression: 'tag'}},
  {name: 'effective_from_date', column: {expression: 'effective_from_date', type: oracledb.DATE}},
  {name: 'effective_to_date', column: {expression: 'effective_to_date', type: oracledb.DATE}},
  {name: 'enabled_flag', column: {expression: 'enabled_flag'}},
]; // END fields

/*
* SQL SELECT statement
*/

const fromClause =
  ' FROM    apps.xeam_lookup_values_v\n' +
  ' WHERE   lookup_type = \'MTL_EAM_ITEM_TYPE\'\n';

const fromClauseWithKey = fromClause +
  ' AND     TO_NUMBER(code) = :item_type_code\n';

/*
* Controllers
*/

module.exports.list = function(request, response, next) {
  const keys = {};
  controller.list(request.query, fields, fromClause, keys, response);
}; /* END list */

module.exports.detail = function(request, response, next) {
  const keys = {
    item_type_code: parseInt(request.params.item_type_code)
  };
  controller.detail(fields, fromClauseWithKey, keys, response);
}; /* END detail */
