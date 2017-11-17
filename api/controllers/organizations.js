const oracledb = require('oracledb');
const controllers = require('./_library');

/*
* URI query field / (reporting) object mappings
*/

const fields = [
  {name: 'organization_id', object: {alias: 'orga', column: 'organization_id', type: oracledb.NUMBER}},
  {name: 'organization', object: {alias: 'orga', column: 'organization'}},
  {name: 'organization_name', object: {alias: 'orga', column: 'organization_name'}},
  {name: 'master_organization_id', object: {alias: 'orga', column: 'master_organization_id', type: oracledb.NUMBER}},
  {name: 'master_organization', object: {alias: 'orga_master', column: 'organization'}},
  {name: 'master_organization_name', object: {alias: 'orga_master', column: 'organization_name'}},
  {name: 'eam_enabled_flag', object: {alias: 'orga', column: 'eam_enabled_flag'}},
  {name: 'maint_organization_id', object: {alias: 'orga', column: 'maint_organization_id', type: oracledb.NUMBER}},
  {name: 'maint_organization', object: {alias: 'orga_maint', column: 'organization'}},
  {name: 'maint_organization_name', object: {alias: 'orga_maint', column: 'organization_name'}},
]; // END fields

/*
* SQL SELECT statement
*/

const fromClause =
  ' FROM    apps.xeam_organizations_v orga\n' +
  '         JOIN apps.xeam_organizations_v orga_master ON orga_master.organization_id = orga.master_organization_id\n' +
  '         LEFT JOIN apps.xeam_organizations_v orga_maint ON orga_maint.organization_id = orga.maint_organization_id\n' +
  ' WHERE   1 = 1\n';

const fromClauseWithKey = fromClause +
  ' AND     orga.organization_id = :organization_id\n';

/*
* Controllers
*/

module.exports.list = function(request, response, next) {
  const keys = {};
  controllers.list(request.query, fields, fromClause, keys, response);
}; /* END list */

module.exports.detail = function(request, response, next) {
  const keys = {
    organization_id: parseInt(request.params.organization_id)
  };
  controllers.detail(fields, fromClauseWithKey, keys, response);
}; /* END detail */
