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

import planesRouter from "./routes/Planes"
app.use("/planes", planesRouter)


/* PassengerFlights */

app.get("/PassengerFlights", async (req: Request, res: Response) => {
  console.log("first route used")
  
  // Define queries
  const query = 'SELECT * FROM Passengers_flights;';

  // Get results from database
  const [results] = await db.pool.query(query);

  // Send JSON back to client
  res.send(JSON.stringify(results));
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

/* LISTENER */
app.listen(port, () => {
  console.log(
    `Express started on http://${process.env.DBHOST}:${port}; press Ctrl-C to terminate.`
  );
});
