const oracledb = require('oracledb');
const controller = require('./_library');

/*
* URI query field / column mappings
*/

const fields = [
  {name: 'activity_cause_code', column: {expression: 'TO_NUMBER(code)', type: oracledb.NUMBER}},
  {name: 'activity_cause', column: {expression: 'meaning'}},
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
  ' WHERE   lookup_type = \'MTL_EAM_ACTIVITY_CAUSE\'\n';

const fromClauseWithKey = fromClause +
  ' AND     TO_NUMBER(code) = :activity_cause_code\n';

/*
* Controllers
*/

module.exports.list = function(request, response, next) {
  const keys = {};
  controller.list(request.query, fields, fromClause, keys, response);
}; /* END list */

module.exports.detail = function(request, response, next) {
  const keys = {
    activity_cause_code: parseInt(request.params.activity_cause_code)
  };
  controller.detail(fields, fromClauseWithKey, keys, response);
}; /* END detail */
