import express, { Request, Response } from "express"
const router = express.Router()

import db from "../database/db-connector"
import { RowDataPacket } from "mysql2"

interface User extends RowDataPacket {
    user_id: number;
}

// Get all passengers
router.get("/", async (req: Request, res: Response) => {
    try {
        const selectQuery = `SELECT Passengers.user_id, passenger_id, Users.username, first_name, last_name, address, city, state, zipcode, passport_number FROM Passengers 
            LEFT JOIN Users ON Users.user_id = Passengers.user_id;`
        const [results] = await db.pool.query(selectQuery)
        res.json(results)
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
})

// Get passenger by ID
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const selectQuery = `SELECT Passengers.user_id, passenger_id, username, first_name, last_name, address, city, state, zipcode, passport_number FROM Passengers
            LEFT JOIN Users ON Users.user_id = Passengers.user_id
            WHERE passenger_id = ${req.params.id};`

        const [results] = await db.pool.query(selectQuery)
        res.json(results)
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
})
  
// Create new passenger
router.post("/", async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const username = data.username;
        const first_name = data.first_name;
        const last_name = data.last_name;
        const address = data.address;
        const city = data.city;
        const state = data.state;
        const zipcode = data.zipcode;
        const passport_number = data.passport_number;

        // Get user
        const userQuery = `SELECT user_id FROM Users WHERE username = ? LIMIT(1)`;
        const userId = (await db.pool.query<User[]>(userQuery, [username]))[0][0].user_id;
  
        const insertQuery = `
            INSERT INTO Passengers (
                user_id
                first_name, 
                last_name, 
                address, 
                city, 
                state, 
                zipcode, 
                passport_number
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?);
        `;
  
        const [results] = await db.pool.query(
            insertQuery,
            [
                userId,
                first_name,
                last_name,
                address,
                city,
                state,
                zipcode,
                passport_number,
            ]);
  
        res.json({ success: true, message: 'Passenger added successfully', results });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
})
  
// Update passenger by ID
router.put("/:id", async (req: Request, res: Response) => {
    try {
        const passenger_id = req.params.id
        const data = req.body;
        
        const first_name = data.first_name;
        const last_name = data.last_name;
        const address = data.address;
        const city = data.city;
        const state = data.state;
        const zipcode = data.zipcode;
        const passport_number = data.passport_number;
  
        const updateQuery = `
            UPDATE Passengers
                SET first_name = "${first_name}",
                last_name = "${last_name}",
                address = "${address}",
                city = "${city}",
                state = "${state}",
                zipcode = "${zipcode}",
                passport_number = "${passport_number}"
                WHERE passenger_id = ${passenger_id}
        `  
  
        const [results] = await db.pool.query(updateQuery)
        res.json({ success: true, message: 'Passenger updated successfully', data });
    } catch(error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  })
  
// Delete passenger by ID
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const passenger_id = parseInt(req.params.id)
        const deleteQuery = `DELETE FROM Passengers WHERE passenger_id = ${passenger_id}`
  
        const [results] = await db.pool.query(deleteQuery)
        res.json({ success: true, message: 'Passenger deleted successfully' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
})

export default router
  