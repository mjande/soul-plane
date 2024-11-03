/* SETUP */
import 'dotenv/config'
import express, { Express } from "express";

const app: Express = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

import cors from 'cors'
app.use(cors());

const options: cors.CorsOptions = {
  origin: process.env.ALLOWED_ORIGINS, 
};

app.use(cors(options))

/* ROUTES */
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
app.listen(process.env.PORT, () => {
  console.log(
    `Express started on ${process.env.HOST}:${process.env.PORT}; press Ctrl-C to terminate.`
  );
});
