import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';
import { Passenger } from "../Passengers/Passengers";

interface PassengerFlights {
  flight_id: string;
  passenger_id: string;
}

function PassengerFlights() {
  const [passengerFlights, setPassengerFlights] = useState<PassengerFlights[]>([]);
  const [passengers, setPassengers] = useState<Passenger[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(`http://${import.meta.env.VITE_HOST_NAME}:55767/passengerFlights`);
        setPassengerFlights(response.data);
      } catch (error) {
        console.error("Error fetching passenger flights data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    Axios.get(`http://${import.meta.env.VITE_HOST_NAME}:55767/passengers`).then((response) => {
      setPassengers(response.data);
    });
  }, []);

  return (
    <div>
      <h1>Passenger Flights</h1>
      <div id="browse">
        <p>
          <strong>Browse Passenger Flights</strong>
        </p>
        <table>
          <thead>
            <tr>
              <th colSpan={2}>Actions</th>
              <th>Flight</th>
              <th>Passenger</th>
              <th>Airport Name</th>
              <th>Passenger Name</th>
            </tr>
          </thead>
          <tbody>
            {passengerFlights.map((passengerFlight, index) => (
              <tr key={index}>
                <td>
                  <Link to={`/passengerFlights/update/${passengerFlight.flight_id}`}>Edit</Link>
                </td>
                <td>
                  <Link to={`/passengerFlights/delete/${passengerFlight.passenger_id}`}>Delete</Link>
                </td>
                <td>{passengerFlight.flight_id}</td>
                <td>{passengerFlight.passenger_id}</td>
                <td>
                  {passengers.map((passenger) => (
                    passengerFlight.passenger_id === passenger.passenger_id && (
                      <div key={passenger.passenger_id}>
                        {`${passenger.first_name} ${passenger.last_name}`}
                      </div>
                    )
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/passengerFlights/new">Add Passenger Flights</Link>
        <p>&nbsp;</p>
      </div>
    </div>
  );
}

export default PassengerFlights;
