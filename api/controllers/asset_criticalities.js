const oracledb = require('oracledb');
const controller = require('./_library');

/*
* URI query field / (reporting) object mappings
*/

const fields = [
  {name: 'criticality_code', object: {column: 'code'}},
  {name: 'criticality', object: {column: 'meaning'}},
  {name: 'description', object: {column: 'description'}},
]; // END fields

/*
* SQL SELECT statement
*/

const fromClause =
  ' FROM    apps.xeam_lookup_values_v\n' +
  ' WHERE   lookup_type = \'MTL_EAM_ASSET_CRITICALITY\'\n';

const fromClauseWithKey = fromClause +
  ' AND     code = :criticality_code\n';

/*
* Controllers
*/

module.exports.list = function(request, response, next) {
  const keys = {};
  controller.list(request.query, fields, fromClause, keys, response);
}; /* END list */

module.exports.detail = function(request, response, next) {
  const keys = {
    criticality_code: request.params.criticality_code
  };
  controller.detail(fields, fromClauseWithKey, keys, response);
}; /* END detail */
