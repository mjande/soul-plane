import express, { Request, Response } from "express"
const router = express.Router()

import db from "../database/db-connector"

// Get all airports
router.get("/", async (req: Request, res: Response) => {
    try {
        const query = 'SELECT * FROM Airports;';
        const [results] = await db.pool.query(query);
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});
  
// Get airport by ID
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const selectQuery = `SELECT * FROM Airports WHERE airport_id = ${req.params.id}`
        const [results] = await db.pool.query(selectQuery)
        res.json(results)
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
})
  
// Create new airport
router.post('/', async (req : Request, res: Response) => {
    try {
        let data = req.body;
        let location = data.location || 'NULL';
        let query = `INSERT INTO Airports (airport_name, airport_code, location) VALUES ('${data.airport_name}', '${data.airport_code}', '${location}')`;
  
        const [results] = await db.pool.query(query);
        res.json({ success: true, message: 'Airport added successfully', data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});
  
// Update existing Airport
router.put('/:airportId', async (req: Request, res: Response) => {
    try {
        const airportId = req.params.airportId;
        let data = req.body;
        let location = data.location;
        let query = `
            UPDATE Airports 
                SET airport_name = '${data.airport_name}', 
                airport_code = '${data.airport_code}', 
                location = '${location}' WHERE airport_id = ${airportId};
        `
  
        const [results] = await db.pool.query(query);
        res.json({ success: true, message: 'Airport updated successfully', data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});
  
// Delete existing Airport
router.delete('/:airportId', async (req: Request, res: Response) => {
    try {
        const airportId = req.params.airportId;
        const deleteQuery = `DELETE FROM Airports WHERE airport_id = ${airportId}`;
  
        const [results] = await db.pool.query(deleteQuery);
        res.json({ success: true, message: 'Airport deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

export default router;
