const oracledb = require('oracledb');
const database = require('../../database');

function getColumnsList(fields) {
  let columnsList = [];
  for (i = 0; i < fields.length; i++)
    columnsList.push(
      fields[i].object.alias + '.' + fields[i].object.column +
      ' AS ' + '"' + fields[i].name + '"'
    );
  return columnsList;
}; // END getColumnsList

module.exports.getColumnsList = getColumnsList;

module.exports.getQueryComponents = function(parameters, fields) {
  let queryComponents = {};

  // Generate SELECT clause columns list
  let columnsList = [];
  let include = parameters.include || null;
  if (include) {
    let includeFields = parameters.include.split(',') || [];
    for (i = 0; i < includeFields.length; i++)
      for (j = 0; j < fields.length; j++)
        if (fields[j].name == includeFields[i]) {
          columnsList.push(
            fields[j].object.alias + '.' + fields[j].object.column +
            ' AS ' + '"' + fields[j].name + '"'
          );
          break;
        }
  }
  if (!include || columnsList.length == 0)
    columnsList = getColumnsList(fields);
  queryComponents.columnsList = columnsList;

  // Generate WHERE clause conditions
  let whereConditions = [];
  for (i = 0; i < fields.length; i++)
    if (parameters[fields[i].name])
      if (parameters[fields[i].name] == 'null' || parameters[fields[i].name] == '!null')
        whereConditions.push(
          fields[i].object.alias + '.' + fields[i].object.column +
          ' IS ' + (parameters[fields[i].name].substr(0, 1) == '!' ? 'NOT ' : '') + 'NULL'
        );
      else
        whereConditions.push(
          (fields[i].object.type || oracledb.STRING) == oracledb.STRING
            ? 'UPPER(' +
              fields[i].object.alias + '.' + fields[i].object.column +
              ') LIKE UPPER(\'' + parameters[fields[i].name].replace(/\*/g, '%') + '\')'
            : fields[i].object.alias + '.' + fields[i].object.column +
              ' = ' + parameters[fields[i].name]
        );
  if (whereConditions.length > 0)
    queryComponents.whereConditions = whereConditions;

  // Generate ORDER BY clause columns
  let orderByColumns = [];
  let sort = parameters.sort || null;
  if (sort) {
    let sortFields = parameters.sort.split(',') || [];
    let sortField, isDescending;
    for (i = 0; i < sortFields.length; i++) {
      if (sortFields[i].substr(0, 1) == '-') {
        sortField = sortFields[i].substr(1);
        isDescending = true;
      } else {
        sortField = sortFields[i];
        isDescending = false;
      }
      for (j = 0; j < fields.length; j++)
        if (fields[j].name == sortField) {
          orderByColumns.push(
            fields[j].object.alias + '.' + fields[j].object.column +
            (isDescending ? ' DESC' : '')
          );
          break;
        }
    }
  }
  if (orderByColumns.length > 0)
    queryComponents.orderByColumns = orderByColumns;

  // Generate row limiting clause properties
  let rowLimiting = {};
  let offset = parseInt(parameters.offset) || 0;
  let next = parseInt(parameters.next) || 0;
  if (offset >= 0 && next > 0) {
    rowLimiting.offset = offset;
    rowLimiting.next = next;
    queryComponents.rowLimiting = rowLimiting;
  }
  
  return queryComponents;
}; // END getQueryComponents

module.exports.getQueryStatement = function(queryComponents, fromClause) {
  let queryStatement = '';

  for (i = 0; i < queryComponents.columnsList.length; i++)
    queryStatement += (i == 0 ? ' SELECT  ' : ' ,       ') + queryComponents.columnsList[i] + '\n';

  queryStatement += fromClause; // Must include at least one "WHERE" condition eg. WHERE 1 = 1
  
  if (queryComponents.whereConditions)
    for (i = 0; i < queryComponents.whereConditions.length; i++)
      queryStatement += ' AND     ' + queryComponents.whereConditions[i] + '\n';

  if (queryComponents.orderByColumns)
    for (i = 0; i < queryComponents.orderByColumns.length; i++) {
      queryStatement += (i == 0 ? ' ORDER\n BY      ' : ' ,       ') + queryComponents.orderByColumns[i] + '\n';
    }

  if (queryComponents.rowLimiting)
    queryStatement +=
      ' OFFSET ' + queryComponents.rowLimiting.offset + ' ROWS' +
      ' FETCH NEXT ' + queryComponents.rowLimiting.next + ' ROWS ONLY';
  
  return queryStatement;
} // END getQueryStatement

module.exports.process = function(config, callback) {
  oracledb.getConnection(database.connectionAttributes, function(error, connection) {
    if (error) {
      callback(error);
      return;
    }
    connection.execute(config.sql, config.bindParams, config.options, function(error, result) {
      if (error) {
        callback(error);
        database.closeConnection(connection);
        return;
      }
      callback(null, result);
      database.closeConnection(connection);
    });
  });
}; // END process
