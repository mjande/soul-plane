// Express imports adapted from Express docs and Node Starter App
// Source URL: https://expressjs.com/en/guide/routing.html
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
// Date: 3/12/24

import express, { Request, Response } from "express"
const router = express.Router()

// Database connection copied from Node Starter App
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
// Date: 3/15/24
import db from "../database/db-connector"

// Routes adapted from Node Starter App with changes adapted from MySQL2 docs (with exception of individual SQL queries and processing unique fields, which was our own work)
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
// Source URL: https://sidorares.github.io/node-mysql2/docs
// Date: 3/12/24

// Get all plane types
router.get("/", async (req: Request, res: Response) => {
    try {
        // Define query
        const selectQuery = 'SELECT * FROM Plane_Types'

        // Get results from database
        const [results] = await db.pool.query(selectQuery)

        // Send JSON back to client
        res.json(results)
    } catch (error) {
        // Error handling
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
})

// Get plane type by ID
router.get("/:id", async (req: Request, res: Response) => {
    try {
        // Define query
        const selectQuery = `SELECT * FROM Plane_Types WHERE plane_type_id = ${req.params.id}`

        // Get results from database
        const [results] = await db.pool.query(selectQuery)

        // Send JSON back to client
        res.json(results)
    } catch (error) {
        // Error handling
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
})
  
// Create new plane type
router.post("/", async (req: Request, res: Response) => {
    try {
        // Define query
        const data = req.body
        const typeName = data.type_name
        const capacity = parseInt(data.capacity)
        const rangeInHours = parseInt(data.range_in_hrs)
  
        const insertQuery = `INSERT INTO Plane_Types (type_name, capacity, range_in_hrs)
        VALUES ("${typeName}", ${capacity}, ${rangeInHours});`
  
        // Get results from database
        const [results] = await db.pool.query(insertQuery)
  
        // Send JSON back to client
        res.json({ success: true, message: 'Plane Type added successfully', data });
    } catch (error) {
        // Error handling
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
})

// Update plane type by ID
router.put("/:id", async (req: Request, res: Response) => {
    try {
        // Define query
        const planeTypeId = req.params.id
        const data = req.body
      
        const typeName = data.type_name
        const capacity = parseInt(data.capacity)
        const rangeInHours = parseInt(data.range_in_hrs)
        const updateQuery = `
            UPDATE Plane_Types 
                SET type_name = "${typeName}",
                capacity = ${capacity},
                range_in_hrs = ${rangeInHours}
                WHERE plane_type_id = ${planeTypeId};
        `
  
        // Get results from database
        const [results] = await db.pool.query(updateQuery)
  
        // Send JSON back to client
        res.json({ success: true, message: 'Plane Type updated successfully', data });
    } catch(error) {
        // Error handling
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
})
  
// Delete plane type
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        // Define query
        const planeTypeID = parseInt(req.params.id)
        const deleteQuery = `DELETE FROM Plane_Types WHERE plane_type_id = ${planeTypeID}`
  
        // Get results from databse
        const [results] = await db.pool.query(deleteQuery)
  
        // Send JSON back to client
        res.json({ success: true, message: 'Plane Type deleted successfully' });
    } catch(error) {
        // Error handling
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
})

export default router;
