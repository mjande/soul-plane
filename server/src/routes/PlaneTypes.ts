import express, { Request, Response } from "express"
const router = express.Router()

import db from "../database/db-connector"

// Get all plane types
router.get("/", async (req: Request, res: Response) => {
    try {
        const selectQuery = 'SELECT * FROM Plane_Types'
        const [results] = await db.pool.query(selectQuery)
        res.json(results)
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
})

// Get plane type by ID
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const selectQuery = `SELECT * FROM Plane_Types WHERE plane_type_id = ${req.params.id}`
        const [results] = await db.pool.query(selectQuery)
        res.json(results)
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
})
  
// Create new plane type
router.post("/", async (req: Request, res: Response) => {
    try {
        const data = req.body
        const typeName = data.type_name
        const capacity = parseInt(data.capacity)
        const rangeInHours = parseInt(data.range_in_hrs)
  
        const insertQuery = `INSERT INTO Plane_Types (type_name, capacity, range_in_hrs)
        VALUES ("${typeName}", ${capacity}, ${rangeInHours});`
  
        const [results] = await db.pool.query(insertQuery)
        res.json({ success: true, message: 'Plane Type added successfully', data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
})

// Update plane type by ID
router.put("/:id", async (req: Request, res: Response) => {
    try {
        const planeTypeId = req.params.id
        const data = req.body
      
        const typeName = data.type_name
        const capacity = parseInt(data.capacity)
        const rangeInHours = parseInt(data.range_in_hrs)
        const updateQuery = `
            UPDATE Plane_Types 
                SET type_name = "${typeName}",
                capacity = ${capacity},
                range_in_hrs = ${rangeInHours}
                WHERE plane_type_id = ${planeTypeId};
        `
  
        const [results] = await db.pool.query(updateQuery)
        res.json({ success: true, message: 'Plane Type updated successfully', data });
    } catch(error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
})
  
// Delete plane type
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const planeTypeID = parseInt(req.params.id)
        const deleteQuery = `DELETE FROM Plane_Types WHERE plane_type_id = ${planeTypeID}`
        const [results] = await db.pool.query(deleteQuery)
        res.json({ success: true, message: 'Plane Type deleted successfully' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
})

export default router;
