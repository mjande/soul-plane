// Get an instance of mysql we can use in the app
import mysql from "mysql2/promise"

// Create a connection pool using the provided credentials
const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBDATABASE
})

export default { pool }



