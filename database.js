const
  oracledb = require('oracledb'),
  environment = process.env.NODE_ENV || 'development',
  config = require('./config')[environment].database,
  connectionAttributes = {
    user: config.username,
    password: config.password,
    connectString: config.hostname + ':' + config.port + '/' + config.sid
  };

let closeConnection = function(connection) {
  connection.close(function(error) {
    if (error) {
      console.error(error.message);
    }
  });
};
  
module.exports.executeCommand = function(request, command, callback) {
  oracledb.getConnection(connectionAttributes, function(error, connection) {
    if (error) {
      callback(error);
      return;
    }
    command(request, connection, function(error, result) {
      if (error) {
        closeConnection(connection);
        callback(error);
        return;
      }
      closeConnection(connection);
      callback(null, result);
    });
  });
};
