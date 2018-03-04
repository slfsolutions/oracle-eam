const oracledb = require('oracledb');
const controller = require('./_library');

/*
* Controller
*/

module.exports.list = function(request, response, next) {
  let columns = request.body.columns;
  let fields = [], field, type;
  for (i = 0; i < columns.length; i++) {
    field = {
      name: columns[i].name,
      column: {
        expression: columns[i].name
      }
    };
    type = null;
    if (columns[i].type && columns[i].type.toLowerCase() != 'string') {
      if (columns[i].type.toLowerCase() == 'number')
        type = oracledb.NUMBER;
      else if (columns[i].type.toLowerCase() == 'date')
        type = oracledb.DATE;
    }
    if (type)
      field.column.type = type;
    fields.push(field);
  }
  const fromClause =
    ' FROM    (\n' +
    request.body.statement + '\n' +
    ' )\n' +
    ' WHERE   1 = 1\n';
    const keys = {};
  controller.list(request.query, fields, fromClause, keys, response);
}; /* END list */
