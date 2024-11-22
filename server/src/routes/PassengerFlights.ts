import express, { Request, Response } from "express"
const router = express.Router()

import db from "../database/db-connector"

// A simple interface that defines the error number returned by a query
interface MySQLError {
    errno: number
}

// Check to see if the error caught in route is a MySQLError
function isMySQLError(error: unknown): error is MySQLError {
    return (error as MySQLError).errno !== undefined;
}

// Get all passengerFlights
router.get("/", async (req: Request, res: Response) => {
    try {
        const query = 'SELECT * FROM Passenger_flights;';
        const [results] = await db.pool.query(query);
        res.send(JSON.stringify(results));
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});
  
// Create new passengerFlight
router.post("/", async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const flight_id = data.flight_id;
        const passenger_id = data.passenger_id;
    
        const insertQuery = `
            INSERT INTO Passenger_flights (flight_id, passenger_id
            ) VALUES ("${flight_id}", "${passenger_id}");
        `;
  
        const [results] = await db.pool.query(
            insertQuery,
            [
                flight_id,
                passenger_id,
            ])
  
        res.json({ success: true, message: 'Passenger added successfully', data });
    } catch (error) {
        console.error(error);

        // Checks error number for duplicate entry code
        if (isMySQLError(error) && error.errno == 1062) {
            return res.status(409).json({ success: false, message: "Duplicate Entry Error"})
        }

        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
})

// Delete passengerFlight by ID
router.delete("/:fid/:pid", async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const flight_id = data.flight_id;
        const passenger_id = data.passenger_id;
        const deleteQuery = `DELETE FROM Passenger_flights WHERE flight_id = ${flight_id} AND passenger_id = ${passenger_id}`
  
        const [results] = await db.pool.query(deleteQuery)
        res.json({ success: true, message: 'Plane Type deleted successfully' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
})

export default router

