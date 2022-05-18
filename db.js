const Pool = require('pg').Pool
const dotenv = require('dotenv')
dotenv.config()

const DB_USER = process.env.NODE_ENV === 'development' ? process.env.DB_LOCAL_USER : process.env.DB_PROD_USER

const DB_PASSWORD = process.env.NODE_ENV === 'development' ? process.env.DB_LOCAL_PASS : process.env.DB_PROD_PASS

const DB_HOST = process.env.NODE_ENV === 'development' ? process.env.DB_LOCAL_HOST : process.env.DB_PROD_HOST

const DB_DBNAME = process.env.NODE_ENV === 'development' ? process.env.DB_LOCAL_DBNAME : process.env.DB_PROD_DBNAME

const DATABASE_URL = 'postgres://aqjlmwkpbbtesf:f3b361c81d6d9ff8246330934565ad462e3c6a1b90a59cad5ac56c07d2efd755@ec2-52-71-69-66.compute-1.amazonaws.com:5432/d8tfbms755suqp'

const pool = new Pool({
    ssl: { rejectUnauthorized: false},
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: 5432,
    database: DB_DBNAME
})

console.log(pool)

module.exports = pool