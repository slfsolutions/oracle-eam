const oracledb = require('oracledb');
const controller = require('./_library');

/*
* URI query field / (reporting) object mappings
*/

const fields = [
  {name: 'status_id', object: {column: 'instance_status_id'}},
  {name: 'status', object: {column: 'name'}},
  {name: 'description', object: {column: 'description'}},
  // display order???
]; // END fields

/*
* SQL SELECT statement
*/

const fromClause =
  ' FROM    apps.csi_instance_statuses\n' +
  ' WHERE   1 = 1\n';

const fromClauseWithKey = fromClause +
  ' AND     instance_status_id = :status_id\n';

/*
* Controllers
*/

module.exports.list = function(request, response, next) {
  const keys = {};
  controller.list(request.query, fields, fromClause, keys, response);
}; /* END list */

module.exports.detail = function(request, response, next) {
  const keys = {
    status_id: parseInt(request.params.status_id)
  };
  controller.detail(fields, fromClauseWithKey, keys, response);
}; /* END detail */
