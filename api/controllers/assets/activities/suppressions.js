const oracledb = require('oracledb');
const controller = require('../../_library');

/*
* URI query field / column mappings
*/

const fields = [
  {name: 'organization_id', column: {expression: 'organization_id', type: oracledb.NUMBER}},
  {name: 'organization', column: {expression: 'organization'}},
  {name: 'asset_id', column: {expression: 'asset_id', type: oracledb.NUMBER}},
  {name: 'asset_number', column: {expression: 'asset_number'}},
  {name: 'activity_id', column: {expression: 'activity_id', type: oracledb.NUMBER}},
  {name: 'activity', column: {expression: 'activity'}},
  {name: 'activity_description', column: {expression: 'description'}},
  {name: 'suppressed_activity_id', column: {expression: 'suppressed_activity_id', type: oracledb.NUMBER}},
  {name: 'suppressed_activity', column: {expression: 'suppressed_activity'}},
  {name: 'suppressed_activity_desc', column: {expression: 'suppressed_activity_desc'}},
  {name: 'description', column: {expression: 'description'}},
]; // END fields

/*
* SQL SELECT statement
*/

const fromClause =
  ' FROM    apps.xeam_activity_suppressions_v\n' +
  ' WHERE   asset_id = :asset_id\n' +
  ' AND     activity_id = :activity_id\n';

  const fromClauseWithKey = fromClause +
  ' AND     suppressed_activity_id = :suppressed_activity_id\n';

/*
* Controllers
*/

module.exports.list = function(request, response, next) {
  const keys = {
    asset_id: parseInt(request.params.asset_id),
    activity_id: parseInt(request.params.activity_id)
  };
  controller.list(request.query, fields, fromClause, keys, response);
}; /* END list */

module.exports.detail = function(request, response, next) {
  const keys = {
    asset_id: parseInt(request.params.asset_id),
    activity_id: parseInt(request.params.activity_id),
    suppressed_activity_id: parseInt(request.params.suppressed_activity_id)
  };
  controller.detail(fields, fromClauseWithKey, keys, response);
}; /* END detail */
