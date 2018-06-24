const oracledb = require('oracledb');
const environment = process.env.NODE_ENV || 'development';
const config = require('./config')[environment].database;

let connectionAttributes = {
  user: config.username,
  password: config.password,
  connectString: config.hostname + ':' + config.port + '/' + config.serviceName
};

module.exports.getConnection = function() {
  return new Promise((resolve, reject) => {
    oracledb.getConnection(connectionAttributes, function(error, connection) {
      if (error) {
        reject(error);
      } else {
        resolve(connection);
      }
    });
  });
}; // END getConnection

module.exports.execute = function(connection, statement) {
  return new Promise((resolve, reject) => {
    connection.execute(statement.sql, statement.bindParams || {}, statement.options || {}, function(error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}; // END execute
  
module.exports.close = function(connection) {
  return new Promise((resolve, reject) => {
    connection.close(function(error) {
      if (error) {
        reject(error);
      } else {
        resolve('Database connection closed.');
      }
    });
  });
}; // END close
