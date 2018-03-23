const config = require('nconf');
const mysql = require('promise-mysql');
const logger = require('winston');

module.exports = (function () {
  let instance = null;

  class Connection {
    constructor() {
      if (instance)
        return instance


      const connectionLimit = 10;

      this.pool = mysql.createPool({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        timezone: 'America/Sao_Paulo',
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        connectionLimit: connectionLimit || null,
        waitForConnections: true,
        supportBigNumbers: true,
        multipleStatements: true,
        connectTimeout: 3000000,
      });

      this.pool.on('error', (err) => {
        logger.log(`Error Pool ${err.code}`);
      });

      this.pool.on('release', (connection) => {
        logger.log('Connection %d released', connection.threadId);
      });

      instance = this;
    }

    static getPool() {
      return this.instance ? this.instance.pool : null;
    }

    static getSqlConnection() {
      if (!this.instance)
        this.instance = new Connection();

      return this.instance.pool.getConnection().disposer((connection) => {
        this.instance.pool.releaseConnection(connection);
      });
    }
  }

  return Connection;
}());
