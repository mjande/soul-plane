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



