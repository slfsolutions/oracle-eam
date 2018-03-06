const oracledb = require('oracledb');
const controller = require('../_library');

/*
* URI query field / column mappings
*/

const fields = [
  {name: 'organization_id', column: {expression: 'acti.organization_id', type: oracledb.NUMBER}},
  {name: 'organization', column: {expression: 'orga.organization'}},
  {name: 'organization_name', column: {expression: 'orga.organization_name'}},
  {name: 'activity_id', column: {expression: 'acti.activity_id', type: oracledb.NUMBER}},
  {name: 'activity', column: {expression: 'acti.activity'}},
  {name: 'description', column: {expression: 'acti.description'}},
  {name: 'activity_type_code', column: {expression: 'acti.activity_type_code'}},
  {name: 'activity_type', column: {expression: 'acti.activity_type'}},
  {name: 'shutdown_type_code', column: {expression: 'acti.shutdown_type_code'}},
  {name: 'shutdown_type', column: {expression: 'acti.shutdown_type'}},
  {name: 'activity_cause_code', column: {expression: 'acti.activity_cause_code'}},
  {name: 'activity_cause', column: {expression: 'acti.activity_cause'}},
  {name: 'activity_source_code', column: {expression: 'acti.activity_source_code'}},
  {name: 'activity_source', column: {expression: 'acti.activity_source'}},
  {name: 'activity_notification_flag', column: {expression: 'acti.activity_notification_flag'}},
]; // END fields

/*
* SQL SELECT statement
*/

const fromClause =
  ' FROM    apps.xeam_activities_v acti\n' +
  '         JOIN apps.xeam_organizations_v orga ON orga.organization_id = acti.organization_id\n' +
  ' WHERE   acti.organization_id = :organization_id\n';

const fromClauseWithKey = fromClause +
  ' AND     acti.activity_id = :activity_id\n';

/*
* Controllers
*/

module.exports.list = function(request, response, next) {
  const keys = {
    organization_id: parseInt(request.params.organization_id)
  };
  controller.list(request.query, fields, fromClause, keys, response);
}; /* END list */

module.exports.detail = function(request, response, next) {
  const keys = {
    organization_id: parseInt(request.params.organization_id),
    activity_id: parseInt(request.params.activity_id)
  };
  controller.detail(fields, fromClauseWithKey, keys, response);
}; /* END detail */
