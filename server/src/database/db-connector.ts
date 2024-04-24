// DB connection copied from Node Starter App with changes inspired by MySQL2 docs
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
// Source URL: https://sidorares.github.io/node-mysql2/docs
// Date: 3/16/24

// Get mysql instance
import mysql from "mysql2/promise"

// Create a connection pool using the provided credentials
const pool = mysql.createPool({
        connectionLimit: 10,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    })

export default { pool }



