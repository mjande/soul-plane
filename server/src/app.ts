// Date: 2/27/2024
// Express code adapted from
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Date: 2/27/2024
// Code for interacting with MySQL database adapted from 
// Source URL: https://sidorares.github.io/node-mysql2/docs

/* SETUP */
import 'dotenv/config'
import express, { Express, Request, Response } from "express";
import { convertToSQLDateTime } from './utils';

const app: Express = express();
const port = 55767;

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Date: 2/28/2024
// Code for allowing Cross-Origin Requests (CORS) adapted from
// Source URL: https://www.twilio.com/en-us/blog/add-cors-support-express-typescript-api
import cors from 'cors'
app.use(cors());

const allowedOrigins = [
  'http://flip3.engr.oregonstate.edu',
  'http://flip2.engr.oregonstate.edu'
];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(cors(options))

// Database
import db from "./database/db-connector"

/* ROUTES */

// Creation and use of routers adapted from Express docs
// Source URL: https://expressjs.com/en/guide/routing.html

import planeTypesRouter from "./routes/PlaneTypes"
app.use('/plane-types', planeTypesRouter)

import airportsRouter from './routes/Airports'
app.use('/airports', airportsRouter)

import passengersRouter from "./routes/Passengers"
app.use('/passengers', passengersRouter)

import flightsRouter from "./routes/Flights"
app.use('/flights', flightsRouter)


/* PassengerFlights */

app.get("/PassengerFlights", async (req: Request, res: Response) => {
  // Define queries
  const query = 'SELECT * FROM Passengers_flights;';

  // Get results from database
  const [results] = await db.pool.query(query);

  // Send JSON back to client
  res.send(JSON.stringify(results));
});

// Not sure why this is here?
app.get("/PassengerFlights", async (req: Request, res: Response) => {
  try {
    const query = `
    SELECT Passengers.first_name, Passengers.last_name, DepartAirport.airport_name, ArriveAirport.airport_name, Flights.depart_time, Flights.arrive_time FROM Passengers_flights
    JOIN Passengers ON Passengers_flights.passenger_id = Passengers.passenger_id
    JOIN Flights ON Passengers_flights.flight_id = Flights.flight_id
    JOIN Airports AS DepartAirport ON Flights.depart_airport_id = DepartAirport.airport_id
    JOIN Airports AS ArriveAirport ON Flights.arrive_airport_id = ArriveAirport.airport_id;
    `;

    // Get results from the database
    const [results] = await db.pool.query(query);

    // Send JSON back to the client
    res.send(JSON.stringify(results));
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.post("/PassengerFlights", async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const flight_id = data.flight_id;
    const passenger_id = data.passenger_id;
  
    const insertQuery = `
    INSERT INTO Passengers_flights (
      flight_id, 
      passenger_id
    ) VALUES ("${flight_id}", "${passenger_id}");
  `;

  db.pool.query(
    insertQuery,
    [
      flight_id,
      passenger_id,
    ])

    res.json({ success: true, message: 'Passenger added successfully', data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
})

app.delete("/passengerFlights/:fid/:pid", async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const flight_id = data.flight_id;
    const passenger_id = data.passenger_id;
    const deleteQuery = `DELETE FROM Passengers_flights WHERE flight_id = ${flight_id} AND passenger_id = ${passenger_id}`

    db.pool.query(deleteQuery)

    res.json({ success: true, message: 'Plane Type deleted successfully' });
  } catch(error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
})

app.put("/passengerFlights/:fid/:pid", async (req: Request, res: Response) => {
  try {
    const fid = req.params.fid;
    const pid = req.params.pid;
    const data = req.body;
    const flight_id = data.flight_id
    const passenger_id = data.passenger_id

    let updateQuery = `
      UPDATE Passengers_flights 
      SET flight_id='${flight_id}', passenger_id ='${passenger_id}' 
      WHERE flight_id = '${fid}' AND passenger_id = '${pid}'
    `;

    db.pool.query(updateQuery)

    res.json({ success: true, message: 'Passenger Flights updated successfully', data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


/* Planes */

app.get("/planes", async (req: Request, res: Response) => {
  try {
    const selectQuery =  'SELECT plane_id, \
                          Plane_types.type_name AS plane_type,\
                          Airports.airport_name AS current_airport FROM Planes\
                          JOIN Plane_types ON Planes.plane_type_id = Plane_types.plane_type_id\
                          LEFT JOIN Airports ON Planes.current_airport_id = Airports.airport_id;'

    const [results] = await db.pool.query(selectQuery)

    res.json(results)
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
})

app.get("/planes/:id", async (req: Request, res: Response) => {
  try {
    const selectQuery =  `SELECT plane_id,\
                          Planes.plane_type_id AS plane_type_id,\
                          Plane_types.type_name AS plane_type,\
                          Planes.current_airport_id AS current_airport_id,\
                          Airports.airport_name AS current_airport FROM Planes\
                          JOIN Plane_types ON Planes.plane_type_id = Plane_types.plane_type_id\
                          LEFT JOIN Airports ON Planes.current_airport_id = Airports.airport_id\
                          WHERE plane_id = ${req.params.id};`

    const [results] = await db.pool.query(selectQuery)

    res.json(results)
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
})

app.post("/planes", async (req: Request, res: Response) => {
  try {
    const data = req.body
    const planeTypeID = parseInt(data.plane_type_id)
    let currentAirportID: number | string = parseInt(data.current_airport_id)

    if (isNaN(currentAirportID)) {
      currentAirportID = "NULL"
    }

    const insertQuery = `INSERT INTO Planes (plane_type_id, current_airport_id)\
    VALUES (${planeTypeID}, ${currentAirportID});`

    await db.pool.query(insertQuery)

    res.json({ success: true, message: 'Plane added successfully', data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
})

app.delete("/planes/:id", async (req: Request, res: Response) => {
  try {
    const planeID = parseInt(req.params.id)
    const deleteQuery = `DELETE FROM Planes WHERE plane_id = ${planeID}`

    await db.pool.query(deleteQuery)

    res.json({ success: true, message: 'Plane deleted successfully' });
  } catch(error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
})

app.put("/planes/:id", async (req: Request, res: Response) => {
  try {
    const planeID = req.params.id
    const data = req.body
    
    const planeTypeID = parseInt(data.plane_type_id)
    let currentAirportID: number | string = parseInt(data.current_airport_id)

    if (isNaN(currentAirportID)) {
      currentAirportID = "NULL"
    }

    const updateQuery = `UPDATE Planes\
      SET plane_type_id = ${planeTypeID},\
      current_airport_id = ${currentAirportID}\
      WHERE plane_id = ${planeID};\
    `

    await db.pool.query(updateQuery)

    res.json({ success: true, message: 'Plane updated successfully', data });
  } catch(error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
})


/* LISTENER */
app.listen(port, () => {
  console.log(
    `Express started on http://${process.env.DBHOST}:${port}; press Ctrl-C to terminate.`
  );
});
