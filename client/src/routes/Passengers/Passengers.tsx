import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';

// Define Passengers Property
export interface Passenger {
  passenger_id: string,
  first_name: string,
  last_name: string,
  phone: string,
  email: string,
  address: string,
  city: string,
  state_abbr: string,
  zip_code: string,
  passport_number: string
}

function Passengers() {
  // Initialize passengers into clientside
  const [passengers, setPassengers] = useState<Passenger[]>([]);  

  // Get request to get all passengers
  useEffect(() => {
    Axios.get(`http://${import.meta.env.VITE_HOST_NAME}:55767/passengers`).then((response) => {
      setPassengers(response.data)
    });
  }, []);

  return (
    <div>
      <h1>Passengers</h1>
      <div id="browse">
        <p>
          <strong>Browse Passengers</strong>
        </p>
        <table>
          <thead>
            <tr>
              <th colSpan={2}>Actions</th>
              <th>Passenger ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>Zip Code</th>
              <th>Passport Number</th>
            </tr>
          </thead>
          <tbody>
            {passengers.map((passenger) => (
              <tr key={passenger.passenger_id}>
                <td>
                  <Link to={`/passengers/update/${passenger.passenger_id}`}>Edit</Link>
                </td>
                <td>
                  <Link to={`/passengers/delete/${passenger.passenger_id}`}>Delete</Link>
                </td>
                <td>{passenger.passenger_id}</td>
                <td>{passenger.first_name}</td>
                <td>{passenger.last_name}</td>
                <td>{passenger.phone}</td>
                <td>{passenger.email}</td>
                <td>{passenger.address}</td>
                <td>{passenger.city}</td>
                <td>{passenger.state_abbr}</td>
                <td>{passenger.zip_code}</td>
                <td>{passenger.passport_number}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/passengers/new">Add Passengers</Link>
        <p>&nbsp;</p>
      </div>
    </div>
  );
}

export default Passengers;
