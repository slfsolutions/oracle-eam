const oracledb = require('oracledb');
const controller = require('./_library');

/*
* URI query field / (reporting) object mappings
*/

const fields = [
  {name: 'organization_id', object: {alias: 'reso', column: 'organization_id', type: oracledb.NUMBER}},
  {name: 'organization', object: {alias: 'orga', column: 'organization'}},
  {name: 'organization_name', object: {alias: 'orga', column: 'organization_name'}},
  {name: 'resource_id', object: {alias: 'reso', column: 'resource_id', type: oracledb.NUMBER}},
  {name: 'resource_code', object: {alias: 'reso', column: 'resource_code'}},
  {name: 'description', object: {alias: 'reso', column: 'description'}},
  {name: 'type', object: {alias: 'reso', column: 'type'}},
  {name: 'charge_type', object: {alias: 'reso', column: 'charge_type'}},
  {name: 'expenditure_type', object: {alias: 'reso', column: 'expenditure_type'}},
  {name: 'inactive_on', object: {alias: 'reso', column: 'inactive_on', type: oracledb.DATE}},
  {name: 'uom', object: {alias: 'reso', column: 'uom'}},
  {name: 'costed', object: {alias: 'reso', column: 'costed'}},
  {name: 'activity', object: {alias: 'reso', column: 'activity'}},
  {name: 'standard_rate', object: {alias: 'reso', column: 'standard_rate'}},
  {name: 'absorption_account', object: {alias: 'reso', column: 'absorption_account'}},
  {name: 'variance_account', object: {alias: 'reso', column: 'variance_account'}},
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
