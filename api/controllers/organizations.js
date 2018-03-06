const oracledb = require('oracledb');
const controller = require('./_library');

/*
* URI query field / column mappings
*/

const fields = [
  {name: 'organization_id', column: {expression: 'orga.organization_id', type: oracledb.NUMBER}},
  {name: 'organization', column: {expression: 'orga.organization'}},
  {name: 'organization_name', column: {expression: 'orga.organization_name'}},
  {name: 'master_organization_id', column: {expression: 'orga.master_organization_id', type: oracledb.NUMBER}},
  {name: 'master_organization', column: {expression: 'orga_master.organization'}},
  {name: 'master_organization_name', column: {expression: 'orga_master.organization_name'}},
]; // END fields

/*
* SQL SELECT statement
*/

const fromClause =
  ' FROM    apps.xeam_organizations_v orga\n' +
  '         JOIN apps.xeam_organizations_v orga_master ON orga_master.organization_id = orga.master_organization_id\n' +
  ' WHERE   orga.eam_enabled_flag = \'Y\'\n';

const fromClauseWithKey = fromClause +
  ' AND     orga.organization_id = :organization_id\n';

/*
* Controllers
*/

module.exports.list = function(request, response, next) {
  const keys = {};
  controller.list(request.query, fields, fromClause, keys, response);
}; /* END list */

module.exports.detail = function(request, response, next) {
  const keys = {
    organization_id: parseInt(request.params.organization_id)
  };
  controller.detail(fields, fromClauseWithKey, keys, response);
}; /* END detail */
