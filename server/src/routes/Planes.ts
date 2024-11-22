import express, { Request, Response } from "express"
const router = express.Router()

import db from "../database/db-connector"

// Get all planes
router.get("/", async (req: Request, res: Response) => {
    try {
        const selectQuery = `
            SELECT plane_id, Plane_Types.type_name AS plane_type,
                Airports.airport_name AS current_airport FROM Planes
                JOIN Plane_Types ON Planes.plane_type_id = Plane_Types.plane_type_id
                LEFT JOIN Airports ON Planes.current_airport_id = Airports.airport_id;
        `
  
        const [results] = await db.pool.query(selectQuery)
        res.json(results)
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
})
  
// Get plane by ID
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const selectQuery = `
            SELECT plane_id, Planes.plane_type_id AS plane_type_id, Plane_Types.type_name AS plane_type, 
                Planes.current_airport_id AS current_airport_id, Airports.airport_name AS current_airport FROM Planes
                JOIN Plane_Types ON Planes.plane_type_id = Plane_Types.plane_type_id\
                LEFT JOIN Airports ON Planes.current_airport_id = Airports.airport_id\
                WHERE plane_id = ${req.params.id};
        `
  
        const [results] = await db.pool.query(selectQuery)
        res.json(results)
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
})
  
// Create new plane
router.post("/", async (req: Request, res: Response) => {
    try {
        const data = req.body
        const planeTypeID = parseInt(data.plane_type_id)
        let currentAirportID: string = data.current_airport_id.toString();
    
        if (currentAirportID == '-1') {
            // Convert currentAirportID to NULL for NULL-able relationship
            currentAirportID = "NULL" 
        }
  
        const insertQuery = `
            INSERT INTO Planes (plane_type_id, current_airport_id)
                VALUES (${planeTypeID}, ${currentAirportID});
        `
  
        const [results] = await db.pool.query(insertQuery)
        res.json({ success: true, message: 'Plane added successfully', data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
})

// Update plane by ID
router.put("/:id", async (req: Request, res: Response) => {
    try {
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
        
        const [result] = await db.pool.query(updateQuery)
        res.json({ success: true, message: 'Plane updated successfully', data });
    } catch(error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
})
  
// Delete plane by ID
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const planeID = parseInt(req.params.id)
        const deleteQuery = `DELETE FROM Planes WHERE plane_id = ${planeID}`
  
        const [results] = await db.pool.query(deleteQuery)
        res.json({ success: true, message: 'Plane deleted successfully' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
})

export default router

  

