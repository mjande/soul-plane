// DB connection copied from Node Starter App with changes inspired by MySQL2 docs
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
// Source URL: https://sidorares.github.io/node-mysql2/docs
// Date: 3/16/24

// Get mysql instance
import mysql from "mysql2/promise"

// Create a connection pool using the provided credentials
const pool = mysql.createPool({
    connectionLimit: 10,
    host: flip3.engr.oregonstate.edu,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBDATABASE
})

export default { pool }



