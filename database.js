const oracledb = require('oracledb');
const environment = process.env.NODE_ENV || 'development';
const config = require('./config')[environment].database;

module.exports.connectionAttributes = {
    user: config.username,
    password: config.password,
    connectString: config.hostname + ':' + config.port + '/' + config.serviceName
  };

module.exports.closeConnection = function(connection) {
  connection.close(function(error) {
    if (error) {
      console.error(error.message);
    }
  });
};
