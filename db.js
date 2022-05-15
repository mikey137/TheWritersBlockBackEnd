const Pool = require('pg').Pool
const dotenv = require('dotenv')
dotenv.config()

const DB_USER = process.env.NODE_ENV === 'development' ? process.env.DB_LOCAL_USER : process.env.DB_PROD_USER

const DB_PASSWORD = process.env.NODE_ENV === 'development' ? process.env.DB_LOCAL_PASSWORD : process.env.DB_PROD_PASSWORD

const DB_HOST = process.env.NODE_ENV === 'development' ? process.env.DB_LOCAL_HOST : process.env.DB_PROD_HOST

const DB_DBNAME = process.env.NODE_ENV === 'development' ? process.env.DB_LOCAL_DBNAME : process.env.DB_PROD_DBNAME

const pool = new Pool({
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: 5432,
    database: DB_DBNAME
})

module.exports = pool