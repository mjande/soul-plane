import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';
import { Passenger } from "../Passengers/Passengers";
import { Airport } from "../Airports";

export interface PassengerFlights {
  flight_id: string;
  passenger_id: string;
}

interface Flights{
  flight_id: string;
  arrive_airport_id: string;
  depart_airport_id: string;
}

function PassengerFlights() {
  const [passengerFlights, setPassengerFlights] = useState<PassengerFlights[]>([]);
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [flights, setFlights] = useState<Flights[]>([]);
  const [airports, setAirports] = useState<Airport[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(`http://${import.meta.env.VITE_HOST_NAME}:55767/passengerFlights`);
        console.log(response)
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

  useEffect(() => {
    Axios.get(`http://${import.meta.env.VITE_HOST_NAME}:55767/flights`).then((response) => {
      setFlights(response.data);
    });
  }, []);

  useEffect(() => {
    Axios.get(`http://${import.meta.env.VITE_HOST_NAME}:55767/airports`).then((response) => {
      setAirports(response.data);
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
                  <Link to={`/PassengerFlights/update/${passengerFlight.flight_id}/${passengerFlight.passenger_id}`}>Edit</Link>
                </td>
                <td>
                  <Link to={`/PassengerFlights/delete/${passengerFlight.flight_id}/${passengerFlight.passenger_id}`}>Delete</Link>
                </td>
                <td>{passengerFlight.flight_id}</td>
                <td>{passengerFlight.passenger_id}</td>
                <td>
                  {flights.map((flight) => (
                    passengerFlight.flight_id === flight.flight_id && (
                      <div key={passengerFlight.flight_id}>
                        {airports[Number(flight.depart_airport_id) - 1]?.airport_name} <span>&#8594;</span> {airports[Number(flight.arrive_airport_id) - 1]?.airport_name}
                      </div>
                    )
                  ))}
                </td>
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
