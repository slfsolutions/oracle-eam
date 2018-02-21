module.exports = {
  development: {
    database: {
      username: process.env.NODE_ORACLE_EAM_DEVELOPMENT_DATABASE_USERNAME || '',
      password: process.env.NODE_ORACLE_EAM_DEVELOPMENT_DATABASE_PASSWORD || '',
      hostname: process.env.NODE_ORACLE_EAM_DEVELOPMENT_DATABASE_HOSTNAME || '',
      port: process.env.NODE_ORACLE_EAM_DEVELOPMENT_DATABASE_PORT || '',
      serviceName: process.env.NODE_ORACLE_EAM_DEVELOPMENT_DATABASE_SERVICE_NAME || ''
    }
  },
  production: {
    database: {
      username: process.env.NODE_ORACLE_EAM_PRODUCTION_DATABASE_USERNAME || '',
      password: process.env.NODE_ORACLE_EAM_PRODUCTION_DATABASE_PASSWORD || '',
      hostname: process.env.NODE_ORACLE_EAM_PRODUCTION_DATABASE_HOSTNAME || '',
      port: process.env.NODE_ORACLE_EAM_PRODUCTION_DATABASE_PORT || '',
      serviceName: process.env.NODE_ORACLE_EAM_PRODUCTION_DATABASE_SERVICE_NAME || ''
    }
  }
}
