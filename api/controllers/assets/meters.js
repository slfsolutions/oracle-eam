const oracledb = require('oracledb');
const controller = require('../_library');

/*
* URI query field / column mappings
*/

const fields = [
  {name: 'organization_id', column: {expression: 'asme.organization_id', type: oracledb.NUMBER}},
  {name: 'organization', column: {expression: 'orga.organization'}},
  {name: 'organization_name', column: {expression: 'orga.organization_name'}},
  {name: 'asset_id', column: {expression: 'asme.asset_id', type: oracledb.NUMBER}},
  {name: 'asset_number', column: {expression: 'asst.asset_number'}},
  {name: 'asset_description', column: {expression: 'asst.description'}},
  {name: 'meter_id', column: {expression: 'asme.meter_id', type: oracledb.NUMBER}},
  {name: 'meter_name', column: {expression: 'metr.meter_name'}},
]; // END fields

/*
* SQL SELECT statement
*/

const fromClause =
  ' FROM    apps.xeam_asset_meters_v asme\n' +
  '         JOIN apps.xeam_organizations_v orga ON orga.organization_id = asme.organization_id\n' +
  '         JOIN apps.xeam_assets_v asst ON asst.asset_id = asme.asset_id\n' +
  '         JOIN apps.xeam_meters_v metr ON metr.meter_id = asme.meter_id\n' +
  ' WHERE   asme.asset_id = :asset_id\n';

const fromClauseWithKey = fromClause +
  ' AND     asme.meter_id = :meter_id\n';

/*
* Controllers
*/

module.exports.list = function(request, response, next) {
  const keys = {
    asset_id: parseInt(request.params.asset_id)
  };
  controller.list(request.query, fields, fromClause, keys, response);
}; /* END list */

module.exports.detail = function(request, response, next) {
  const keys = {
    asset_id: parseInt(request.params.asset_id),
    meter_id: parseInt(request.params.meter_id)
  };
  controller.detail(fields, fromClauseWithKey, keys, response);
}; /* END detail */
