// Routing infrastructure adapted from Express docs and Node Starter App
// Source URL: https://expressjs.com/en/guide/routing.html
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
// Date: 3/12/24

import express, { Request, Response } from "express"
const router = express.Router()
import db from "../database/db-connector"
import { convertToSQLDateTime } from '../utils';

// Routes adapted from Node Starter App with changes adapted from MySQL2 docs (with exception of individual SQL queries and processing unique fields, which was our own work)
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
// Source URL: https://sidorares.github.io/node-mysql2/docs
// Date: 3/12/24

// Get all flights
router.get("/", async (req: Request, res: Response) => {
    try {
        // Define query
        const selectQuery = `
            SELECT flight_id, Flights.plane_id, Plane_types.type_name AS plane_type,
                depart_airport_id, DepartAirport.airport_name AS depart_airport_name,
                arrive_airport_id, ArriveAirport.airport_name AS arrive_airport_name,
                depart_time, arrive_time FROM Flights
                JOIN Airports AS DepartAirport ON Flights.depart_airport_id = DepartAirport.airport_id
                JOIN Airports AS ArriveAirport ON Flights.arrive_airport_id = ArriveAirport.airport_id
                JOIN Planes ON Flights.plane_id = Planes.plane_id\
                JOIN Plane_types ON Planes.plane_type_id = Plane_types.plane_type_id;
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
  
// Get flight by ID
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const selectQuery = `
            SELECT flight_id, Flights.plane_id, Plane_types.type_name AS plane_type, depart_airport_id,
                DepartAirport.airport_name AS depart_airport_name, arrive_airport_id, ArriveAirport.airport_name AS arrive_airport_name,
                depart_time, arrive_time FROM Flights
                JOIN Airports AS DepartAirport ON Flights.depart_airport_id = DepartAirport.airport_id
                JOIN Airports AS ArriveAirport ON Flights.arrive_airport_id = ArriveAirport.airport_id
                JOIN Planes ON Flights.plane_id = Planes.plane_id
                JOIN Plane_types ON Planes.plane_type_id = Plane_types.plane_type_id
                WHERE Flights.flight_id = ${req.params.id};
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
  
// Create new flight
router.post("/", async (req: Request, res: Response) => {
    try {
        // Define query
        const data = req.body
        const planeID = parseInt(data.plane_id)
        const departAirportID = parseInt(data.depart_airport_id)
        const arriveAirportID = parseInt(data.arrive_airport_id)
        const departTime = convertToSQLDateTime(data.depart_time)
        const arriveTime = convertToSQLDateTime(data.arrive_time)
  
        const insertQuery = `
            INSERT INTO Flights (plane_id, depart_airport_id, arrive_airport_id, depart_time, arrive_time)
                VALUES (${planeID}, ${departAirportID}, ${arriveAirportID}, '${departTime}', '${arriveTime}');
        `

        // Get results from database
        const [results] = await db.pool.query(insertQuery)
  
        // Send JSON back to client
        res.json({ success: true, message: 'Flight added successfully', data });
    } catch (error) {
        // Error handling
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
})

// Update flight by ID
router.put("/:id", async (req: Request, res: Response) => {
    try {
        // Define query
        const flightID = req.params.id
        const data = req.body
  
        const planeID = parseInt(data.plane_id)
        const departAirportID = parseInt(data.depart_airport_id)
        const arriveAirportID = parseInt(data.arrive_airport_id)
        const departTime = convertToSQLDateTime(data.depart_time)
        const arriveTime = convertToSQLDateTime(data.arrive_time)
  
        const updateQuery = `
            UPDATE Flights SET plane_id = ${planeID}, depart_airport_id = ${departAirportID}, 
                arrive_airport_id = ${arriveAirportID}, depart_time = '${departTime}', 
                arrive_time = '${arriveTime}' WHERE flight_id = ${flightID};
        `
    
        // Get results from databawe
        const [results] = await db.pool.query(updateQuery)
  
        // Send JSON back to client
        res.json({ success: true, message: 'Flight updated successfully', data });
    } catch(error) {
        // Error handling
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
})
  
// Delete flight by ID
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        // Define query
        const id = parseInt(req.params.id)
        const deleteQuery = `DELETE FROM Flights WHERE flight_id = ${id}`
  
        // Get results from database
        const [results] = await db.pool.query(deleteQuery)
  
        // Send JSON back to client
        res.json({ success: true, message: 'Flight deleted successfully' });
    } catch(error) {
        // Error handling
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
})

export default router
