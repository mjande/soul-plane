import express, { Request, Response } from "express"
const router = express.Router()

import db from "../database/db-connector"

// Get all passengers
router.get("/", async (req: Request, res: Response) => {
    try {
        const selectQuery = 'SELECT * FROM Passengers'
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
        const selectQuery = `SELECT * FROM Passengers WHERE passenger_id = ${req.params.id}`
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
  
        res.json({ success: true, message: 'Passenger added successfully', data });
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
  