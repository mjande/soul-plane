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

// Type checking for errors adapted from Typescript docs
// Source URL: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
// Date: 3/13/24

// A simple interface that defines the error number returned by a query
interface MySQLError {
    errno: number
}

// Check to see if the error caught in route is a MySQLError
function isMySQLError(error: unknown): error is MySQLError {
    return (error as MySQLError).errno !== undefined;
}

// Routes adapted from Node Starter App with changes adapted from MySQL2 docs (with exception of individual SQL queries and processing unique fields, which was our own work)
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
// Source URL: https://sidorares.github.io/node-mysql2/docs
// Date: 3/12/24

// Get all passengerFlights
router.get("/", async (req: Request, res: Response) => {
    try {
        // Define query
        const query = 'SELECT * FROM Passenger_flights;';

        // Get results from database
        const [results] = await db.pool.query(query);
  
        // Send JSON back to client
        res.send(JSON.stringify(results));
    } catch (error) {
        // Error handling
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});
  
// Create new passengerFlight
router.post("/", async (req: Request, res: Response) => {
    try {
        // Define query
        const data = req.body;
        const flight_id = data.flight_id;
        const passenger_id = data.passenger_id;
    
        const insertQuery = `
            INSERT INTO Passenger_flights (flight_id, passenger_id
            ) VALUES ("${flight_id}", "${passenger_id}");
        `;
  
        // Get results from database
        const [results] = await db.pool.query(
            insertQuery,
            [
                flight_id,
                passenger_id,
            ])
  
        // Send JSON to client
        res.json({ success: true, message: 'Passenger added successfully', data });
    } catch (error) {
        // Error handling
        console.error(error);

        // Checks error number for duplicate entry code
        if (isMySQLError(error) && error.errno == 1062) {
            return res.status(409).json({ success: false, message: "Duplicate Entry Error"})
        }

        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
})

// Update passengerFlight by ID
router.put("/:fid/:pid", async (req: Request, res: Response) => {
    try {
        // Define query
        const fid = req.params.fid;
        const pid = req.params.pid;
        const data = req.body;
        const flight_id = data.flight_id
        const passenger_id = data.passenger_id  
    
        let updateQuery = `
            UPDATE Passenger_flights 
                SET flight_id='${flight_id}', passenger_id ='${passenger_id}' 
                WHERE flight_id = '${fid}' AND passenger_id = '${pid}'
        `;
  
        // Get results from database
        const [results, error] = await db.pool.query(updateQuery)
        console.log(results)
  
        // Send JSON back to client
        res.json({ success: true, message: 'Passenger Flights updated successfully', data });
    } catch (error) {
        // Error handling
        console.error(error);

        // Checks error number for duplicate entry code
        if (isMySQLError(error) && error.errno == 1062) {
            return res.status(409).json({ success: false, message: "Duplicate Entry Error"})
        }
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});
  
// Delete passengerFlight by ID
router.delete("/:fid/:pid", async (req: Request, res: Response) => {
    try {
        // Define query
        const data = req.body;
        const flight_id = data.flight_id;
        const passenger_id = data.passenger_id;
        const deleteQuery = `DELETE FROM Passenger_flights WHERE flight_id = ${flight_id} AND passenger_id = ${passenger_id}`
  
        // Get results from database
        const [results] = await db.pool.query(deleteQuery)
  
        // Send JSON back to client
        res.json({ success: true, message: 'Plane Type deleted successfully' });
    } catch(error) {
        // Error handling
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
})

export default router

