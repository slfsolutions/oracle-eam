const oracledb = require('oracledb');

function getSelectList(fields) {
  let selectList = [];
  for (i = 0; i < fields.length; i++)
    selectList.push(fields[i].column + ' AS ' + '"' + fields[i].name + '"');
  return selectList;
}; // END getSelectList

module.exports.getSelectList = getSelectList;

module.exports.getQueryComponents = function(request, fields) {
  let parameters = request.query;
  let queryComponents = {};

  // Generate select list data
  let selectList = [];
  let include = parameters.include || null;
  if (include) {
    let includeFields = parameters.include.split(',') || [];
    for (i = 0; i < includeFields.length; i++)
      for (j = 0; j < fields.length; j++)
        if (fields[j].name == includeFields[i]) {
          selectList.push(fields[j].column + ' AS ' + '"' + fields[j].name + '"');
          break;
        }
  }
  if (!include || selectList.length == 0)
    selectList = getSelectList(fields);
  queryComponents.selectList = selectList;

  // Generate where clause data
  let whereClause = [];
  for (i = 0; i < fields.length; i++)
    if (parameters[fields[i].name])
      whereClause.push(
        (fields[i].type || oracledb.STRING) == oracledb.STRING
          ? 'UPPER(' + fields[i].column + ') LIKE UPPER(\'' + parameters[fields[i].name].replace(/\*/g, '%') + '\')'
          : fields[i].column + ' = ' + parameters[fields[i].name]
      );
  if (whereClause.length > 0)
    queryComponents.whereClause = whereClause;

  // Generate order by clause data
  let orderByClause = [];
  let sort = parameters.sort || null;
  if (sort) {
    let sortFields = parameters.sort.split(',') || [];
    let sortField, descendingOrder;
    for (i = 0; i < sortFields.length; i++) {
      sortField = sortFields[i].substr(0, 1) == '-' ? sortFields[i].substr(1) : sortFields[i];
      descendingOrder = sortFields[i].substr(0, 1) == '-' ? true : false;
      for (j = 0; j < fields.length; j++)
        if (fields[j].name == sortField) {
          orderByClause.push(fields[j].column + (descendingOrder ? ' DESC' : ''));
          break;
        }
    }
  }
  if (orderByClause.length > 0)
    queryComponents.orderByClause = orderByClause;

  // Generate row limiting clause data
  let rowLimitingClause = {};
  let offset = parseInt(parameters.offset) || 0;
  let next = parseInt(parameters.next) || 0;
  if (offset >= 0 && next > 0) {
    rowLimitingClause.offset = offset;
    rowLimitingClause.next = next;
    queryComponents.rowLimitingClause = rowLimitingClause;
  }
  
  return queryComponents;
}; // END getQueryComponents

module.exports.getQueryStatement = function(queryComponents, fromClause) {
  let queryStatement = '';

  for (i = 0; i < queryComponents.selectList.length; i++)
    queryStatement += (i == 0 ? ' SELECT  ' : ' ,       ') + queryComponents.selectList[i] + '\n';

  queryStatement += fromClause; // Assume it includes at least one "WHERE" clause
  
  if (queryComponents.whereClause)
    for (i = 0; i < queryComponents.whereClause.length; i++)
      queryStatement += ' AND     ' + queryComponents.whereClause[i] + '\n';

  if (queryComponents.orderByClause)
    for (i = 0; i < queryComponents.orderByClause.length; i++) {
      queryStatement += (i == 0 ? ' ORDER\n' : '');
      queryStatement += (i == 0 ? ' BY      ' : ' ,       ') + queryComponents.orderByClause[i] + '\n';
    }

  if (queryComponents.rowLimitingClause)
    queryStatement +=
      ' OFFSET ' + queryComponents.rowLimitingClause.offset + ' ROWS' +
      ' FETCH NEXT ' + queryComponents.rowLimitingClause.next + ' ROWS ONLY';
  
  return queryStatement;
} // END getQueryStatement
