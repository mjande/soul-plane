// Code for interacting with MySQL database adapted from 
// Source URL: https://sidorares.github.io/node-mysql2/docs
// Date: 2/27/2024

/* SETUP */

// Express code adapted from
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
// Date: 2/27/2024
import 'dotenv/config'
import express, { Express } from "express";

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

/* ROUTES */

// Creation and use of routers adapted from Express docs
// Source URL: https://expressjs.com/en/guide/routing.html
// Date: 3/15/24

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

import passengerFlightsRouter from "./routes/PassengerFlights"
app.use("/passengerFlights", passengerFlightsRouter)

/* LISTENER */

// Express code adapted from
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
// Date: 2/27/2024
app.listen(port, () => {
  console.log(
    `Express started on http://${flip3.engr.oregonstate.edu}:${port}; press Ctrl-C to terminate.`
  );
});
