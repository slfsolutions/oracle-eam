const oracledb = require('oracledb');
const database = require('../../database');

function getColumnsList(fields) {
  let columnsList = [];
  for (i = 0; i < fields.length; i++)
    columnsList.push(
      fields[i].column.expression + ' AS ' + '"' + fields[i].name + '"'
    );
  return columnsList;
}; // END getColumnsList

function getQueryComponents(parameters, fields) {
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
            fields[j].column.expression + ' AS ' + '"' + fields[j].name + '"'
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
          fields[i].column.expression + ' IS ' +
          (parameters[fields[i].name].substr(0, 1) == '!' ? 'NOT ' : '') + 'NULL'
        );
      else
        whereConditions.push(
          (fields[i].column.type || oracledb.STRING) == oracledb.STRING
            ? 'UPPER(' + fields[i].column.expression +
              ') LIKE UPPER(\'' + parameters[fields[i].name].replace(/\*/g, '%') + '\')'
            : fields[i].column.expression + ' = ' + parameters[fields[i].name]
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
            fields[j].column.expression + (isDescending ? ' DESC' : '')
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

function getQueryStatement(queryComponents, fromClause) {
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

function executeStatement(statement, callback) {
  //console.log(statement);
  oracledb.getConnection(database.connectionAttributes, function(error, connection) {
    if (error) {
      callback(error);
      return;
    }
    connection.execute(statement.sql, statement.bindParams, statement.options, function(error, result) {
      if (error) {
        callback(error);
        database.closeConnection(connection);
        return;
      }
      callback(null, result);
      database.closeConnection(connection);
    });
  });
}; // END executeStatement

module.exports.list = function(parameters, fields, fromClause, keys, response) {
  const statement = {
    sql: getQueryStatement(
      getQueryComponents(parameters, fields),
      fromClause
    ),
    bindParams: keys,
    options: {
      maxRows: 99999, // Overrides default of 100! Make configurable?
      outFormat: oracledb.OBJECT
    }
  };
  executeStatement(statement, function(error, result) {
    if (error) {
      console.error(error.message);
      return;
    }
    response.json(result.rows);
  });
}; // END list

function detail(fields, fromClauseWithKey, keys, response) {
  const statement = {
    sql: getQueryStatement(
      {columnsList: getColumnsList(fields)},
      fromClauseWithKey
    ),
    bindParams: keys,
    options: {
      outFormat: oracledb.OBJECT
    }
  };
  executeStatement(statement, function(error, result) {
    if (error) {
      console.error(error.message);
      return;
    }
    response.json(result.rows[0]);
  });
}; // END detail

module.exports.detail = detail;

module.exports.compound = function(statement, fields, fromClauseWithKey, getKeys, response) {
  executeStatement(statement, function(error, result) {
    if (error) {
      console.error(error.message);
      return;
    }
    if (result.outBinds.return_status != 'S') {
      response.json(result.outBinds);
      return;
    }
    detail(
      fields,
      fromClauseWithKey,
      getKeys(statement.bindParams, result.outBinds),
      response
    );
  });
}; // END compound
