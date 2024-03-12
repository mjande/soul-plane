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

// Get all passengers
router.get("/", async (req: Request, res: Response) => {
    try {
        // Define query
        const selectQuery = 'SELECT * FROM Passengers'
  
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

// Get passenger by ID
router.get("/:id", async (req: Request, res: Response) => {
    try {
        // Define query
        const selectQuery = `SELECT * FROM Passengers WHERE passenger_id = ${req.params.id}`
  
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
  
// Create new passenger
router.post("/", async (req: Request, res: Response) => {
    try {
        // Define query
        const data = req.body;
        const first_name = data.first_name;
        const last_name = data.last_name;
        const phone = data.phone;
        const email = data.email;
        const address = data.address;
        const city = data.city;
        const state_abbr = data.state_abbr;
        const zip_code = data.zip_code;
        const passport_number = data.passport_number;
  
        const insertQuery = `
            INSERT INTO Passengers (
                first_name, 
                last_name, 
                phone, 
                email, 
                address, 
                city, 
                state_abbr, 
                zip_code, 
                passport_number
            ) VALUES ("${first_name}", "${last_name}", "${phone}", "${email}","${address}", "${city}","${state_abbr}","${zip_code}","${passport_number}");
        `;
  
        // Get results from database
        const [results] = await db.pool.query(
        insertQuery,
        [
            first_name,
            last_name,
            phone,
            email,
            address,
            city,
            state_abbr,
            zip_code,
            passport_number,
        ])
  
        // Send JSON back to client
        res.json({ success: true, message: 'Passenger added successfully', data });
    } catch (error) {
        // Error handling
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
})
  
// Update passenger by ID
router.put("/:id", async (req: Request, res: Response) => {
    try {
        // Define query
        const passenger_id = req.params.id
        const data = req.body;
        
        const first_name = data.first_name;
        const last_name = data.last_name;
        const phone = data.phone;
        const email = data.email;
        const address = data.address;
        const city = data.city;
        const state_abbr = data.state_abbr;
        const zip_code = data.zip_code;
        const passport_number = data.passport_number;
  
        const updateQuery = `
            UPDATE Passengers
                SET first_name = "${first_name}",
                last_name = "${last_name}",
                phone = "${phone}",
                email = "${email}",
                address = "${address}",
                city = "${city}",
                state_abbr = "${state_abbr}",
                zip_code = "${zip_code}",
                passport_number = "${passport_number}"
                WHERE passenger_id = ${passenger_id}
        `  
  
        // Get results from database
        const [results] = await db.pool.query(updateQuery)
  
        // Send JSON back to client
        res.json({ success: true, message: 'Passenger updated successfully', data });
    } catch(error) {
        // Error handling
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  })
  
// Delete passenger by ID
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        // Define query
        const passenger_id = parseInt(req.params.id)
        const deleteQuery = `DELETE FROM Passengers WHERE passenger_id = ${passenger_id}`
  
        // Get results from database
        const [results] = await db.pool.query(deleteQuery)
  
        // Send JSON back to client
        res.json({ success: true, message: 'Passenger deleted successfully' });
    } catch(error) {
        // Error handling
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
})

export default router
  