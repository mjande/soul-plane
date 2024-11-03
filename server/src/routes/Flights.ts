import express, { Request, Response } from "express"
const router = express.Router()

import db from "../database/db-connector"

import { convertToSQLDateTime } from '../utils';

// Get all flights
router.get("/", async (req: Request, res: Response) => {
    try {
        const selectQuery = `
            SELECT flight_id, Flights.plane_id, Plane_Types.type_name AS plane_type,
                depart_airport_id, DepartAirport.airport_name AS depart_airport_name,
                arrive_airport_id, ArriveAirport.airport_name AS arrive_airport_name,
                depart_time, arrive_time FROM Flights
                JOIN Airports AS DepartAirport ON Flights.depart_airport_id = DepartAirport.airport_id
                JOIN Airports AS ArriveAirport ON Flights.arrive_airport_id = ArriveAirport.airport_id
                JOIN Planes ON Flights.plane_id = Planes.plane_id
                JOIN Plane_Types ON Planes.plane_type_id = Plane_Types.plane_type_id;
        `

        const [results] = await db.pool.query(selectQuery)
        res.json(results)
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
})
  
// Get flight by ID
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const selectQuery = `
            SELECT flight_id, Flights.plane_id, Plane_Types.type_name AS plane_type, depart_airport_id,
                DepartAirport.airport_name AS depart_airport_name, arrive_airport_id, ArriveAirport.airport_name AS arrive_airport_name,
                depart_time, arrive_time FROM Flights
                JOIN Airports AS DepartAirport ON Flights.depart_airport_id = DepartAirport.airport_id
                JOIN Airports AS ArriveAirport ON Flights.arrive_airport_id = ArriveAirport.airport_id
                JOIN Planes ON Flights.plane_id = Planes.plane_id
                JOIN Plane_Types ON Planes.plane_type_id = Plane_Types.plane_type_id
                WHERE Flights.flight_id = ${req.params.id};
        `
        const [results] = await db.pool.query(selectQuery)
        res.json(results)
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
})
  
// Create new flight
router.post("/", async (req: Request, res: Response) => {
    try {
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

        const [results] = await db.pool.query(insertQuery)
        res.json({ success: true, message: 'Flight added successfully', data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
})

// Update flight by ID
router.put("/:id", async (req: Request, res: Response) => {
    try {
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
    
        const [results] = await db.pool.query(updateQuery)
        res.json({ success: true, message: 'Flight updated successfully', data });
    } catch(error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
})
  
// Delete flight by ID
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        const deleteQuery = `DELETE FROM Flights WHERE flight_id = ${id}`
  
        const [results] = await db.pool.query(deleteQuery)
        res.json({ success: true, message: 'Flight deleted successfully' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
})

export default router
