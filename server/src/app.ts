// Date: 2/27/2024
// Express code adapted from
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Date: 2/27/2024
// Code for interacting with MySQL database adapted from 
// Source URL: https://sidorares.github.io/node-mysql2/docs

/* SETUP */
import 'dotenv/config'
import express, { Express, Request, Response } from "express";


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
// Get all airports
app.get("/Airports", async (req: Request, res: Response) => {
  // Define queries
  const query = 'SELECT * FROM Airports;';

  // Get results from database
  const [results] = await db.pool.query(query);

  // Send JSON back to client
  res.send(JSON.stringify(results));
});

// Get passenger flights
app.get("/PassengerFlights", async (req: Request, res: Response) => {
  // Define queries
  const query = 'SELECT * FROM Passengers_flights;';

  // Get results from database
  const [results] = await db.pool.query(query);

  // Send JSON back to client
  res.send(JSON.stringify(results));
});

// Create new airport
app.post('/Airports', async (req, res) => {
  try {
    // Define query
    let data = req.body;
    let location = data.location || 'NULL';

    let query = `INSERT INTO Airports (airport_name, airport_code, location) VALUES ('${data.airport_name}', '${data.airport_code}', '${location}')`;

    // Get results from database
    const [result] = await db.pool.query(query);

    // Send JSON back to client
    res.json({ success: true, message: 'Airport added successfully', data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Update existing Airport
app.put('/Airports/:airportId', async (req, res) => {
  try {
    // Define query
    const airportId = req.params.airportId;
    let data = req.body;
    let location = data.location || 'NULL';

    let query = `UPDATE Airports SET airport_name = '${data.airport_name}', airport_code = '${data.airport_code}', location = '${location}' WHERE airport_id = ${airportId}`;

    // Get results from database
    const [result] = await db.pool.query(query);

    // Send JSON back to client
    res.json({ success: true, message: 'Airport updated successfully', data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Delete existing Airport
app.delete('/Airports/:airportId', async (req, res) => {
  try {
    // Define query
    const airportId = req.params.airportId;
    const deleteQuery = `DELETE FROM Airports WHERE airport_id = ${airportId}`;

    // Get result from database
    const [result] = await db.pool.query(deleteQuery);

    // Send JSON back to client
    res.json({ success: true, message: 'Airport deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.get("/plane-types", async (req: Request, res: Response) => {
  try {
    const selectQuery = 'SELECT * FROM Plane_types'

    const [results] = await db.pool.query(selectQuery)

    res.json(results)
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
})

app.get("/plane-types/:id", async (req: Request, res: Response) => {
  try {
    const selectQuery = `SELECT * FROM Plane_types WHERE plane_type_id = ${req.params.id}`

    const [results] = await db.pool.query(selectQuery)

    res.json(results)
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
})

app.post("/plane-types/", async (req: Request, res: Response) => {
  try {
    const data = req.body
    const typeName = data.type_name
    const capacity = parseInt(data.capacity)
    const rangeInHours = parseInt(data.range_in_hrs)

    const insertQuery = `INSERT INTO Plane_types (type_name, capacity, range_in_hrs)
    VALUES ("${typeName}", ${capacity}, ${rangeInHours});`

    db.pool.query(insertQuery)

    res.json({ success: true, message: 'Plane Type added successfully', data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
})

app.delete("/plane-types/:id", async (req: Request, res: Response) => {
  try {
    const planeTypeID = parseInt(req.params.id)
    const deleteQuery = `DELETE FROM Plane_types WHERE plane_type_id = ${planeTypeID}`

    db.pool.query(deleteQuery)

    res.json({ success: true, message: 'Plane Type deleted successfully' });
  } catch(error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
})

app.put("/plane-types/:id", async (req: Request, res: Response) => {
  try {
    const planeTypeId = req.params.id
    const data = req.body
    
    const typeName = data.type_name
    const capacity = parseInt(data.capacity)
    const rangeInHours = parseInt(data.range_in_hrs)
    const updateQuery = `UPDATE Plane_types\
      SET type_name = "${typeName}",\
      capacity = ${capacity},\
      range_in_hrs = ${rangeInHours}\
      WHERE plane_type_id = ${planeTypeId}\
    `

    db.pool.query(updateQuery)

    res.json({ success: true, message: 'Plane Type updated successfully', data });
  } catch(error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
})

app.get("/passengers", async (req: Request, res: Response) => {
  try {
    const selectQuery = 'SELECT * FROM Passengers'

    const [results] = await db.pool.query(selectQuery)

    res.json(results)
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
})

app.post("/passengers/", async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const first_name = data.first_name;
    const last_name = data.last_name;
    const phone = data.phone;
    const email = data.email;
    const address = data.address;
    const city = data.city;
    const state_abbr = data.state_abbr;
    const zip_code = data.zip_code;
    const passport_number = data.passport_number;

    const insertQuery = `
    INSERT INTO Passengers (
      first_name, 
      last_name, 
      phone, 
      email, 
      address, 
      city, 
      state_abbr, 
      zip_code, 
      passport_number
    ) VALUES ("${first_name}", "${last_name}", "${phone}", "${email}","${address}", "${city}","${state_abbr}","${zip_code}","${passport_number}");
  `;

  db.pool.query(
    insertQuery,
    [
      first_name,
      last_name,
      phone,
      email,
      address,
      city,
      state_abbr,
      zip_code,
      passport_number,
    ])

    res.json({ success: true, message: 'Passenger added successfully', data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
})

app.get("/passengers/:id", async (req: Request, res: Response) => {
  try {
    const selectQuery = `SELECT * FROM Passengers WHERE passenger_id = ${req.params.id}`

    const [results] = await db.pool.query(selectQuery)

    res.json(results)
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
})

app.put("/passengers/:id", async (req: Request, res: Response) => {
  try {
    const passenger_id = req.params.id
    const data = req.body;
    
    const first_name = data.first_name;
    const last_name = data.last_name;
    const phone = data.phone;
    const email = data.email;
    const address = data.address;
    const city = data.city;
    const state_abbr = data.state_abbr;
    const zip_code = data.zip_code;
    const passport_number = data.passport_number;

    const updateQuery = `UPDATE Passengers\
    SET first_name = "${first_name}",\
    last_name = "${last_name}",\
    phone = "${phone}",\
    email = "${email}",\
    address = "${address}",\
    city = "${city}",\
    state_abbr = "${state_abbr}",\
    zip_code = "${zip_code}",\
    passport_number = "${passport_number}"\
    WHERE passenger_id= ${passenger_id}
  `  

    db.pool.query(updateQuery)

    res.json({ success: true, message: 'Passenger updated successfully', data });
  } catch(error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
})

app.delete("/passengers/:id", async (req: Request, res: Response) => {
  try {
    const passenger_id = parseInt(req.params.id)
    const deleteQuery = `DELETE FROM Passengers WHERE passenger_id = ${passenger_id}`

    db.pool.query(deleteQuery)

    res.json({ success: true, message: 'Passenger deleted successfully' });
  } catch(error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
})

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


/* LISTENER */
app.listen(port, () => {
  console.log(
    `Express started on http://${process.env.DBHOST}:${port}; press Ctrl-C to terminate.`
  );
});
