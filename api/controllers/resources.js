const oracledb = require('oracledb');
const controller = require('./_library');

/*
* URI query field / column mappings
*/

const fields = [
  {name: 'organization_id', column: {expression: 'reso.organization_id', type: oracledb.NUMBER}},
  {name: 'organization', column: {expression: 'orga.organization'}},
  {name: 'organization_name', column: {expression: 'orga.organization_name'}},
  {name: 'resource_id', column: {expression: 'reso.resource_id', type: oracledb.NUMBER}},
  {name: 'resource_code', column: {expression: 'reso.resource_code'}},
  {name: 'description', column: {expression: 'reso.description'}},
  {name: 'resource_type', column: {expression: 'reso.resource_type'}},
  {name: 'charge_type', column: {expression: 'reso.charge_type'}},
  {name: 'expenditure_type', column: {expression: 'reso.expenditure_type'}},
  {name: 'inactive_on', column: {expression: 'reso.inactive_on', type: oracledb.DATE}},
  {name: 'uom', column: {expression: 'reso.uom'}},
  {name: 'costed_flag', column: {expression: 'reso.costed_flag'}},
  {name: 'activity', column: {expression: 'reso.activity'}},
  {name: 'standard_rate_flag', column: {expression: 'reso.standard_rate_flag'}},
  {name: 'absorption_account', column: {expression: 'reso.absorption_account'}},
  {name: 'variance_account', column: {expression: 'reso.variance_account'}},
]; // END fields

/*
* SQL SELECT statement
*/

const fromClause =
  ' FROM    apps.xeam_resources_v reso\n' +
  '         JOIN apps.xeam_organizations_v orga ON orga.organization_id = reso.organization_id\n' +
  ' WHERE   1 = 1\n';

const fromClauseWithKey = fromClause +
  ' AND     reso.resource_id = :resource_id\n';

/*
* Controllers
*/

module.exports.list = function(request, response, next) {
  const keys = {};
  controller.list(request.query, fields, fromClause, keys, response);
}; /* END list */

module.exports.detail = function(request, response, next) {
  const keys = {
    resource_id: parseInt(request.params.resource_id)
  };
  controller.detail(fields, fromClauseWithKey, keys, response);
}; /* END detail */
