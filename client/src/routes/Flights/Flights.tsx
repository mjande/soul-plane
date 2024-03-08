import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

interface Flight {
  flight_id: number,
  plane_id: number, 
  plane_type: string,
  depart_airport_name: string,
  arrive_airport_name: string,
  depart_time: string,
  arrive_time: string
}

function Flights() {
  const [flights, setFlights] = useState<Flight[]>([])

  useEffect(() => {
    async function getFlights() {
      const response = await Axios.get(`http://${import.meta.env.VITE_HOST_NAME}:55767/flights`)
      const flightsArray = response.data
      flightsArray.sort((a: Flight, b: Flight) => a.flight_id - b.flight_id)

      setFlights(flightsArray)
    }

    getFlights()
  }, [])

  return (
    <div>
      <h1>Flights</h1>

      <div id="browse">
        <p>
          <strong>Browse Flights</strong>
        </p>
        <table>
          <thead>
            <tr>
              <th>New</th>
              <th></th>
              <th>Flight ID</th>
              <th>Departure Airport</th>
              <th>Arrival Airport</th>
              <th>Plane ID</th>
              <th>Departure Time</th>
              <th>Arrival Time</th>
            </tr>
          </thead>
          <tbody>
            {flights.map(flight => (
              <tr>
                <td>
                  <Link to={`/flights/update/${flight.flight_id}`}>Edit</Link>
                </td>
                <td>
                  <Link to={`/flights/delete/${flight.flight_id}`}></Link>
                </td>
                <td>{flight.flight_id}</td>
                <td>{flight.depart_airport_name}</td>
                <td>{flight.arrive_airport_name}</td>
                <td>{`${flight.plane_id} (${flight.plane_type})`}</td>
                <td>{flight.depart_time}</td>
                <td>{flight.arrive_time}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>&nbsp;</p>
      </div>

      <div id="insert">
        <form id="addFlight" method="post">
          <legend>
            <strong>Add Flight</strong>
          </legend>
          <fieldset className="fields">
            <label>Departure Airport</label>
            <select name="depart_airport_id">
              <option value="1">Portland International Airport</option>
              <option value="2">Seattle-Tacoma International</option>
              <option value="3">Spokane International Airport</option>
            </select>
            <label>Arrival Airport</label>
            <select name="arrive_airport_id">
              <option value="1">Portland International Airport</option>
              <option value="2">Seattle-Tacoma International</option>
              <option value="3">Spokane International Airport</option>
            </select>
            <label>Plane</label>
            <select name="plane_id">
              <option value="1">Plane #1 (Airbus A320-200)</option>
              <option value="2">Plane #2 (Boeing B737-800)</option>
              <option value="3">Plane #3 (Embraer 135)</option>
            </select>
            <label>Departure Time</label> <input type="datetime-local" name="depart_time" />
            <label>Arrival Time</label> <input type="datetime-local" name="arrive_time" />
          </fieldset>
          <div className="buttons-container">
            <input className="btn" type="submit" value="Add Flight" />
            <input className="btn" type="button" value="Cancel" />
          </div>
        </form>
      </div>

      <div id="update">
        <form id="updateFlight" method="post">
          <legend>
            <strong>Update Flight</strong>
          </legend>
          <fieldset className="fields">
            <span>Flight ID: 1</span>
            <label>Departure Airport</label>
            <select name="depart_airport_id">
              <option value="1">Portland International Airport</option>
              <option value="2">Seattle-Tacoma International</option>
              <option value="3">Spokane International Airport</option>
            </select>
            <label>Arrival Airport</label>
            <select name="arrive_airport_id">
              <option value="1">Portland International Airport</option>
              <option value="2">Seattle-Tacoma International</option>
              <option value="3">Spokane International Airport</option>
            </select>
            <label>Plane</label>
            <select name="plane_id">
              <option value="1">Plane #1 (Airbus A320-200)</option>
              <option value="2">Plane #2 (Boeing B737-800)</option>
              <option value="3">Plane #3 (Embraer 135)</option>
            </select>
            <label>Departure Time</label> <input type="datetime-local" value="2024-02-05T14:30" name="depart_time" />
            <label>Arrival Time</label> <input type="datetime-local" value="2024-02-11T02:15" name="arrive_time" />
          </fieldset>
          <div className="buttons-container">
            <input className="btn" type="submit" value="Save Update Flight" />
            <input className="btn" type="button" value="Cancel" />
          </div>
        </form>
      </div>

      <div id="delete">
        <form id="deleteFlight" method="post">
          <legend>
            <strong>Delete Flight</strong>
          </legend>
          <fieldset className="fields">
            <span>Are you sure you wish to delete the following? </span>
            <span>Flight ID: 1</span>
            <span>Departure Airport: Portland International Airport</span>
            <span>Arrival Airport: Seattle-Tacoma International Airport</span>
            <span>Plane: Plane #3 (Embraer 135)</span>
            <span>Depart Time: February 5, 2024, at 14:30:00 </span>
            <span>Arrival Time: February 11, 2024, at 02:15:00</span>
          </fieldset>
          <div className="buttons-container">
            <input className="btn" type="submit" value="Delete Flight" />
            <input className="btn" type="button" value="Cancel" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Flights;
