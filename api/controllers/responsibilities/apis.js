const oracledb = require('oracledb');
const controller = require('../_library');

/*
* URI query field / column mappings
*/

const fields = [
  {name: 'responsibility_id', column: {expression: 'apre.responsibility_id', type: oracledb.NUMBER}},
  {name: 'responsibility_name', column: {expression: 'resp.name'}},
  {name: 'api_id', column: {expression: 'apre.api_id', type: oracledb.NUMBER}},
  {name: 'api_name', column: {expression: 'apis.name'}},
]; // END fields

/*
* SQL SELECT statement
*/

const fromClause =
  ' FROM    apps.xeam_api_responsibilities_v apre\n' +
  '         JOIN apps.xeam_responsibilities_v resp ON resp.responsibility_id = apre.responsibility_id\n' +
  '         JOIN apps.xeam_apis_v apis ON apis.api_id = apre.api_id\n' +
  ' WHERE   apre.responsibility_id = :responsibility_id\n';

const fromClauseWithKey = fromClause +
  ' AND     apre.api_id = :api_id\n';

/*
* Controllers
*/

module.exports.list = function(request, response, next) {
  const keys = {
    responsibility_id: parseInt(request.params.responsibility_id)
  };
  controller.list(request, fields, fromClause, keys, response);
}; /* END list */

module.exports.detail = function(request, response, next) {
  const keys = {
    responsibility_id: parseInt(request.params.responsibility_id),
    api_id: parseInt(request.params.api_id)
  };
  controller.detail(request, fields, fromClauseWithKey, keys, response);
}; /* END detail */

module.exports.create = function(request, response, next) {
  let statement = {
    sql:
      ' BEGIN\n' +
      '   apps.xeam_api_responsibility_pkg.create_api_responsibility(\n' +
      '     x_return_status => :return_status\n' +
      '   , x_msg_count => :msg_count\n' +
      '   , x_msg_data => :msg_data\n' +
      '   , p_responsibility_id => :responsibility_id\n' +
      '   , p_api_id => :api_id\n' +
      '   );\n' +
      ' END;\n',
    bindParams: {
      return_status: {dir: oracledb.BIND_OUT, type: oracledb.STRING},
      msg_count: {dir: oracledb.BIND_OUT, type: oracledb.NUMBER},
      msg_data: {dir: oracledb.BIND_OUT, type: oracledb.STRING},
      responsibility_id: parseInt(request.params.responsibility_id),
      api_id: request.body.api_id || null
    },
    options: {}
  };
  const getKeys = function(initial, result) {
    return {
      responsibility_id: initial.responsibility_id,
      api_id: initial.api_id
    };
  };
  controller.change(request, statement, fields, fromClauseWithKey, getKeys, response);
}; /* END create */

module.exports.delete = function(request, response, next) {
  let statement = {
    sql:
      ' BEGIN\n' +
      '   apps.xeam_api_responsibility_pkg.delete_api_responsibility(\n' +
      '     x_return_status => :return_status\n' +
      '   , x_msg_count => :msg_count\n' +
      '   , x_msg_data => :msg_data\n' +
      '   , p_responsibility_id => :responsibility_id\n' +
      '   , p_api_id => :api_id\n' +
      '   );\n' +
      ' END;\n',
    bindParams: {
      return_status: {dir: oracledb.BIND_OUT, type: oracledb.STRING},
      msg_count: {dir: oracledb.BIND_OUT, type: oracledb.NUMBER},
      msg_data: {dir: oracledb.BIND_OUT, type: oracledb.STRING},
      responsibility_id: parseInt(request.params.responsibility_id),
      api_id: parseInt(request.params.api_id)
    },
    options: {}
  };
  controller.delete(request, statement, response);
}; /* END delete */
