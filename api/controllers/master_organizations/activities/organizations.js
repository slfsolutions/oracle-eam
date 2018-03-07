const oracledb = require('oracledb');
const controller = require('../../_library');

/*
* URI query field / column mappings
*/

const fields = [
  {name: 'organization_id', column: {expression: 'orga.organization_id', type: oracledb.NUMBER}},
  {name: 'organization', column: {expression: 'orga.organization'}},
  {name: 'organization_name', column: {expression: 'orga.organization_name'}},
  {name: 'assigned_flag', column: {expression: 'CASE WHEN acti.activity_id IS NOT NULL THEN \'Y\' ELSE \'N\' END'}},
]; // END fields

/*
* SQL SELECT statement
*/

const fromClause =
  ' FROM    apps.xeam_organizations_v orga\n' +
  '         LEFT JOIN apps.xeam_activities_v acti ON acti.organization_id = orga.organization_id AND acti.activity_id = :activity_id\n' +
  ' WHERE   orga.master_organization_id = :master_organization_id\n' +
  ' AND     orga.eam_enabled_flag = \'Y\'\n';

const fromClauseWithKey = fromClause +
  ' AND     orga.organization_id = :organization_id\n';

/*
* Controllers
*/

module.exports.list = function(request, response, next) {
  const keys = {
    master_organization_id: parseInt(request.params.master_organization_id),
    activity_id: parseInt(request.params.activity_id)
  };
  controller.list(request.query, fields, fromClause, keys, response);
}; /* END list */

module.exports.detail = function(request, response, next) {
  const keys = {
    master_organization_id: parseInt(request.params.master_organization_id),
    activity_id: parseInt(request.params.activity_id),
    organization_id: parseInt(request.params.organization_id)
  };
  controller.detail(fields, fromClauseWithKey, keys, response);
}; /* END detail */
