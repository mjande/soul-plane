// Routing infrastructure adapted from Express docs and Node Starter App
// Source URL: https://expressjs.com/en/guide/routing.html
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
// Date: 3/12/24

import express, { Request, Response } from "express"
const router = express.Router()
import db from "../database/db-connector"

// Routes adapted from Node Starter App with changes adapted from MySQL2 docs (with exception of individual SQL queries and processing unique fields, which was our own work)
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
// Source URL: https://sidorares.github.io/node-mysql2/docs
// Date: 3/12/24

// Get all planes
router.get("/", async (req: Request, res: Response) => {
    try {
        // Define query
        const selectQuery = `
            SELECT plane_id, Plane_Types.type_name AS plane_type,
                Airports.airport_name AS current_airport FROM Planes
                JOIN Plane_Types ON Planes.plane_type_id = Plane_Types.plane_type_id
                LEFT JOIN Airports ON Planes.current_airport_id = Airports.airport_id;
        `
  
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
  
// Get plane by ID
router.get("/:id", async (req: Request, res: Response) => {
    try {
        // Define query
        const selectQuery = `
            SELECT plane_id, Planes.plane_type_id AS plane_type_id, Plane_Types.type_name AS plane_type, 
                Planes.current_airport_id AS current_airport_id, Airports.airport_name AS current_airport FROM Planes
                JOIN Plane_Types ON Planes.plane_type_id = Plane_Types.plane_type_id\
                LEFT JOIN Airports ON Planes.current_airport_id = Airports.airport_id\
                WHERE plane_id = ${req.params.id};
        `
  
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
  
// Create new plane
router.post("/", async (req: Request, res: Response) => {
    try {
        // Define query
        const data = req.body
        const planeTypeID = parseInt(data.plane_type_id)
        let currentAirportID: number | string = parseInt(data.current_airport_id)
    
        if (isNaN(currentAirportID)) {
            // Convert currentAirportID to NULL for NULL-able relationship
            currentAirportID = "NULL" 
        }
  
        const insertQuery = `
            INSERT INTO Planes (plane_type_id, current_airport_id)
                VALUES (${planeTypeID}, ${currentAirportID});
        `
  
        // Get results from database
        const [results] = await db.pool.query(insertQuery)
  
        // Send JSON back to client
        res.json({ success: true, message: 'Plane added successfully', data });
    } catch (error) {
        // Error handling
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
})

// Update plane by ID
router.put("/:id", async (req: Request, res: Response) => {
    try {
        // Define query
        const planeID = req.params.id
        const data = req.body
        const planeTypeID = parseInt(data.plane_type_id)
        let currentAirportID: number | string = parseInt(data.current_airport_id)
  
        if (isNaN(currentAirportID)) {
            // Convert currentAirportID to NULL for NULL-able relationship
            currentAirportID = "NULL"
        }
  
        const updateQuery = `
            UPDATE Planes
                SET plane_type_id = ${planeTypeID},
                current_airport_id = ${currentAirportID}
                WHERE plane_id = ${planeID};
        `
        
        // Get result from database
        const [result] = await db.pool.query(updateQuery)
  
        // Send JSON back to client
        res.json({ success: true, message: 'Plane updated successfully', data });
    } catch(error) {
        // Error handling
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
})
  
// Delete plane by ID
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        // Define query
        const planeID = parseInt(req.params.id)
        const deleteQuery = `DELETE FROM Planes WHERE plane_id = ${planeID}`
  
        // Get results from database
        const [results] = await db.pool.query(deleteQuery)
  
        // Send JSON back to client
        res.json({ success: true, message: 'Plane deleted successfully' });
    } catch(error) {
        // Error handling
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
})

export default router

  

