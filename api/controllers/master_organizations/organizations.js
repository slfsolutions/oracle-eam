const oracledb = require('oracledb');
const controller = require('../_library');

/*
* URI query field / column mappings
*/

const fields = [
  {name: 'organization_id', column: {expression: 'organization_id', type: oracledb.NUMBER}},
  {name: 'organization', column: {expression: 'organization'}},
  {name: 'organization_name', column: {expression: 'organization_name'}},
]; // END fields

/*
* SQL SELECT statement
*/

const fromClause =
  ' FROM    apps.xeam_organizations_v\n' +
  ' WHERE   master_organization_id = :master_organization_id\n' +
  ' AND     eam_enabled_flag = \'Y\'\n';

const fromClauseWithKey = fromClause +
  ' AND     organization_id = :organization_id\n';

/*
* Controllers
*/

module.exports.list = function(request, response, next) {
  const keys = {
    master_organization_id: parseInt(request.params.master_organization_id)
  };
  controller.list(request.query, fields, fromClause, keys, response);
}; /* END list */

module.exports.detail = function(request, response, next) {
  const keys = {
    master_organization_id: parseInt(request.params.master_organization_id),
    organization_id: parseInt(request.params.organization_id)
  };
  controller.detail(fields, fromClauseWithKey, keys, response);
}; /* END detail */
