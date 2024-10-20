import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import Axios from "axios"

// Define Airport properties
export interface Airport {
    airport_id: number;
    airport_name: string;
    airport_code: string;
    location: string;
  }

function Airports() {
    // Initialize airport data
    const [airports, setAirports] = useState<Airport[]>([]);

    // Get request for airport data
    
    // Request adapted from Axios docs
    // Source URL: https://axios-http.com/docs/api_intro
    // Date: 3/16/24
    useEffect(() => {
        Axios.get(`http://${import.meta.env.VITE_BACKEND_HOST}/Airports`).then((response) => {
          setAirports(response.data);
        });
      }, [airports]);

    const url = `http://${import.meta.env.VITE_BACKEND_HOST}/Airports`;

  return (
    <div>
      <h1>Airports</h1>
      <div id="browse">
        <p>
          <strong>Browse Airports</strong>
        </p>
        <p>URL: {url}</p>

        <table>
          <thead>
            <tr>
              <th colSpan={2}>New</th>
              <th>Airport ID</th>
              <th>Airport </th>
              <th>Airport Code</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
              {airports.map((airport) => (
                <tr key={airport.airport_id}>
                  <td>
                    <Link to={`/airports/update/${airport.airport_id}`}>Edit</Link>
                  </td>
                  <td>
                    <Link to={`/airports/delete/${airport.airport_id}`}>Delete</Link>
                  </td>
                  <td>{airport.airport_id}</td>
                  
                  <td>{airport.airport_name}</td>
                  <td>{airport.airport_code}</td>
                  <td>{airport.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        <Link to="/airports/new">Add Airport Type</Link>
        <p>&nbsp;</p>
      </div>
    </div>
  );
}

export default Airports;
