const oracledb = require('oracledb');
const controller = require('./_library');

/*
* URI query field / column mappings
*/

const fields = [
  {name: 'organization_id', column: {expression: 'orga_master.organization_id', type: oracledb.NUMBER}},
  {name: 'organization', column: {expression: 'orga_master.organization'}},
  {name: 'organization_name', column: {expression: 'orga_master.organization_name'}},
]; // END fields

/*
* SQL SELECT statement
*/

const fromClause =
  ' FROM    apps.xeam_organizations_v orga_master\n' +
  ' WHERE   orga_master.organization_id = orga_master.master_organization_id\n' +
  ' AND     EXISTS (\n' +
  '           SELECT  1\n' +
  '           FROM    apps.xeam_organizations_v orga\n' +
  '           WHERE   orga.master_organization_id = orga_master.organization_id\n' +
  '           AND     orga.eam_enabled_flag = \'Y\'\n' +
  '         )\n';

const fromClauseWithKey = fromClause +
  ' AND     orga_master.organization_id = :master_organization_id\n';

/*
* Controllers
*/

module.exports.list = function(request, response, next) {
  const keys = {};
  controller.list(request.query, fields, fromClause, keys, response);
}; /* END list */

module.exports.detail = function(request, response, next) {
  const keys = {
    master_organization_id: parseInt(request.params.master_organization_id)
  };
  controller.detail(fields, fromClauseWithKey, keys, response);
}; /* END detail */
