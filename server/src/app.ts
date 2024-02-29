// Date: 2/27/2024
// Express code adapted from
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Date: 2/27/2024
// MySQL code adapted from 
// https://sidorares.github.io/node-mysql2/docs

/* SETUP */
import 'dotenv/config'
import express, { Express, Request, Response } from "express";
import cors from 'cors'

const app: Express = express();
const port = 55767;

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))

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
app.get("/Airports", async (req: Request, res: Response) => {
  // Define queries
  const query = 'SELECT * FROM Airports;';

  // Get results from database
  const [results] = await db.pool.query(query);

  // Send JSON back to client
  res.send(JSON.stringify(results));
});


app.get("/PassengerFlights", async (req: Request, res: Response) => {
  // Define queries
  const query = 'SELECT * FROM Passengers_flights;';

  // Get results from database
  const [results] = await db.pool.query(query);

  // Send JSON back to client
  res.send(JSON.stringify(results));
});

app.get("/test", (req: Request, res: Response) => {
  res.send("Does this work?")
})

app.post('/Airports', async (req, res) => {
  try {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    let location = data.location || 'NULL';

    let query = `INSERT INTO Airports (airport_name, airport_code, location) VALUES ('${data.airport_name}', '${data.airport_code}', '${location}')`;

    const [result] = await db.pool.query(query);
    res.json({ success: true, message: 'Airport added successfully', data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Update existing Airport
app.put('/Airports/:airportId', async (req, res) => {
  try {
    const airportId = req.params.airportId;
    let data = req.body;
    let location = data.location || 'NULL';

    let query = `UPDATE Airports SET airport_name = '${data.airport_name}', airport_code = '${data.airport_code}', location = '${location}' WHERE airport_id = ${airportId}`;

    const [result] = await db.pool.query(query);
    res.json({ success: true, message: 'Airport updated successfully', data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


/* LISTENER */
app.listen(port, () => {
  console.log(
    "Express started on http://localhost:" +
      port +
      "; press Ctrl-C to terminate."
  );
});
