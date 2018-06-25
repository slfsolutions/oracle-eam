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

async function process(request, statementType, statement, response) {
  let connection;
  try {
    // Establish database connection
    connection = await database.getConnection();
    // Statement initialization ie. Set accessibility context
    let result;
    result = await database.execute(
      connection
    , {
        sql:
        ' BEGIN\n' +
        '   apps.xeam_pkg.initialize(\n' +
        '     :user_name\n' +
        '   , :password\n' +
        '   , :responsibility_name\n' +
        '   );\n' +
        ' END;\n',
        bindParams: {
          user_name: request.headers['x-xeam-user-name'] || null,
          password: request.headers['x-xeam-password'] || null,
          responsibility_name: request.headers['x-xeam-responsibility-name'] || null
        }
      }
    );
    // Statement execution
    result = await database.execute(connection, statement);
    let responseBody;
    if (statementType == 'list') {
      responseBody = result.rows;
    } else if (statementType == 'detail') {
      responseBody = result.rows[0] || {};
    } else { // Is a 'change' or 'delete' statement
      responseBody = {};
      responseBody.result = result.outBinds;
      if (result.outBinds.return_status == 'S') { // Statement was successful
        if (statementType == 'change') { // Retrieve changed (created/updated) 'detail' data
          result = await database.execute(
            connection
          , {
              sql: getQueryStatement(
                {columnsList: getColumnsList(statement.detail.fields)},
                statement.detail.fromClauseWithKey
              ),
              bindParams: statement.detail.getKeys(statement.bindParams, result.outBinds),
              options: {
                outFormat: oracledb.OBJECT
              }
            }
          );
          responseBody.data = result.rows[0]; // Return 'detail' data
        }
        result = await database.execute(connection, {sql: 'COMMIT'});
      } else { // Statement was unsuccessful ie. result.outBinds.return_status != 'S'
        responseBody.data = request.body; // Return sent data
      }
    }
    response.json(responseBody);
    result = await database.close(connection);
  } catch (error) {
    response.status(500).json({error: error.message});
    console.error(error.message);
    if (connection) result = await database.close(connection);
  }
}; // END process

module.exports.list = function(request, fields, fromClause, keys, response) {
  const statement = {
    sql: getQueryStatement(
      getQueryComponents(request.query, fields),
      fromClause
    ),
    bindParams: keys,
    options: {
      maxRows: 99999, // Overrides default of 100! Make configurable?
      outFormat: oracledb.OBJECT
    }
  };
  process(request, 'list', statement, response);
}; // END list

module.exports.detail = function(request, fields, fromClauseWithKey, keys, response) {
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
  process(request, 'detail', statement, response);
}; // END detail

module.exports.change = function(request, statement, fields, fromClauseWithKey, getKeys, response) {
  statement.detail = {};
  statement.detail.fields = fields;
  statement.detail.fromClauseWithKey = fromClauseWithKey;
  statement.detail.getKeys = getKeys;
  process(request, 'change', statement, response);
}; // END change

module.exports.delete = function(request, statement, response) {
  process(request, 'delete', statement, response);
}; // END delete
