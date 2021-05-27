async function main() {
  const mysql = require('mysql2');

  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
  });

  const promisePool = pool.promise();

  async function query(sql, params) {

    const promisePool = pool.promise();
    const [results,] = await promisePool.execute(sql, params);

    return results;
  }
  module.exports = query;
}

main();

