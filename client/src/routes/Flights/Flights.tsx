import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { FlightView } from "../../models";

function Flights() {
  // Initialize flight for clientside
  const [flights, setFlights] = useState<FlightView[]>([])

  // Get request for flights in the database 
  useEffect(() => {
    async function getFlights() {
      const response = await Axios.get(`${import.meta.env.VITE_BACKEND_HOST}/flights`)
      const flightsArray = response.data
      flightsArray.sort((a: FlightView, b: FlightView) => a.flight_id - b.flight_id)

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
              <th colSpan={2}>Actions</th>
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
                  <Link to={`/flights/edit/${flight.flight_id}`}>Edit</Link>
                </td>
                <td>
                  <Link to={`/flights/delete/${flight.flight_id}`}>Delete</Link>
                </td>
                <td>{flight.flight_id}</td>
                <td>{flight.depart_airport_name}</td>
                <td>{flight.arrive_airport_name}</td>
                <td>{`${flight.plane_id} (${flight.plane_type})`}</td>
                <td>{new Date(flight.depart_time).toLocaleString()}</td>
                <td>{new Date(flight.arrive_time).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/flights/new">Add Flight</Link>
        <p>&nbsp;</p>
      </div>
    </div>
  );
}

export default Flights;
