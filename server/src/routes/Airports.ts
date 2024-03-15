// Express imports  adapted from Express docs and Node Starter App
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

// Get all airports
router.get("/", async (req: Request, res: Response) => {
    try {
        // Define query
        const query = 'SELECT * FROM Airports;';

        // Get results from database
        const [results] = await db.pool.query(query);

        // Send JSON back to client
        res.json(results);
    } catch (error) {
        // Error handling
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});
  
// Get airport by ID
router.get("/:id", async (req: Request, res: Response) => {
    try {
        // Define query
        const selectQuery = `SELECT * FROM Airports WHERE airport_id = ${req.params.id}`
  
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
  
// Create new airport
router.post('/', async (req : Request, res: Response) => {
    try {
        // Define query
        let data = req.body;
        let location = data.location || 'NULL';
  
        let query = `INSERT INTO Airports (airport_name, airport_code, location) VALUES ('${data.airport_name}', '${data.airport_code}', '${location}')`;
  
        // Get results from database
        const [results] = await db.pool.query(query);
  
        // Send JSON back to client
        res.json({ success: true, message: 'Airport added successfully', data });
    } catch (error) {
        // Error handling
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});
  
// Update existing Airport
router.put('/:airportId', async (req: Request, res: Response) => {
    try {
        // Define query
        const airportId = req.params.airportId;
        let data = req.body;
        let location = data.location;
  
        let query = `
            UPDATE Airports 
                SET airport_name = '${data.airport_name}', 
                airport_code = '${data.airport_code}', 
                location = '${location}' WHERE airport_id = ${airportId};
        `
  
        // Get results from database
        const [results] = await db.pool.query(query);
  
        // Send JSON back to client
        res.json({ success: true, message: 'Airport updated successfully', data });
    } catch (error) {
        // Error handling
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});
  
// Delete existing Airport
router.delete('/:airportId', async (req: Request, res: Response) => {
    try {
        // Define query
        const airportId = req.params.airportId;
        const deleteQuery = `DELETE FROM Airports WHERE airport_id = ${airportId}`;
  
        // Get result from database
        const [results] = await db.pool.query(deleteQuery);
  
        // Send JSON back to client
        res.json({ success: true, message: 'Airport deleted successfully' });
    } catch (error) {
        // Error handling
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

export default router;
