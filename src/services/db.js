const mariadb = require('mariadb');

var pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: process.env.DB_CONNECTION_LIMIT,
});
async function getConn(){
    let conn = await pool.getConnection();
    return conn;
}

module.exports.getConn = getConn;