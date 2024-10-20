import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Axios from 'axios';
import { Passenger } from "../Passengers/Passengers";
import { Airport } from "../Airports/Airports";
import { useNavigate } from "react-router-dom";


// Define Flights Properties
interface Flights {
  flight_id: string;
  arrive_airport_id: string;
  depart_airport_id: string;
}

// Define PassengerFlights FormData properties
interface FormData {
  flight_id: string;
  passenger_id: string;
}

export default function NewPassengerFlights() {
  // Initialize data for client for passengers, flights, airports, and passenger flights
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [flights, setFlights] = useState<Flights[]>([]);
  const [airports, setAirports] = useState<Airport[]>([]);
  const [formData, setFormData] = useState<FormData>({
    flight_id: '',
    passenger_id: '',
  });

  // Get request to get data for passengers, flights, airports

  // Request adapted from Axios docs
  // Source URL: https://axios-http.com/docs/api_intro
  // Date: 3/16/24
  useEffect(() => {
    Axios.get(`${import.meta.env.VITE_BACKEND_HOST}/passengers`).then((response) => {
      setPassengers(response.data);
    });
  }, []);

  useEffect(() => {
    Axios.get(`${import.meta.env.VITE_BACKEND_HOST}/flights`).then((response) => {
      setFlights(response.data);
    });
  }, []);

  useEffect(() => {
    Axios.get(`${import.meta.env.VITE_BACKEND_HOST}/airports`).then((response) => {
      setAirports(response.data);
    });
  }, []);

  const navigate = useNavigate();

  // Handle input changes for passenger flights
  function handleInputChange(event: ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  // Send a post request for adding new passenger flights

  // Request adapted from Axios docs
  // Source URL: https://axios-http.com/docs/api_intro
  // Date: 3/16/24
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await Axios.post(
        `${import.meta.env.VITE_BACKEND_HOST}/passengerFlights`,
        formData
      );

      console.log(response);

      navigate("/PassengerFlights");
    } catch (error) {
      // Type checking adapted from StackOverflow post
      // Source URL: https://stackoverflow.com/questions/69264472/axios-error-typescript-annotation-must-be-any-or-unknown-if
      // Date: 3/13/24
      if (Axios.isAxiosError(error) && error.response?.data.message == "Duplicate Entry Error") {
          alert("Error: This passenger is already booked on this flight! Please select a different passenger or a different flight.")
          console.log("Error: This passenger is already booked on this flight! Please select a different passenger or a different flight.")
      }
      
      console.log(error);
    }
  }

  return (
    <div>
      <h1>Passenger Flight</h1>

      <div id="insert">
        <form id="addPassengers" method="post" onSubmit={handleSubmit}>
          <legend>
            <strong>Add Passenger Flight</strong>
          </legend>
          <fieldset className="fields">
            <label>Flight</label>
            <select
              name="flight_id"
              onChange={handleInputChange}
              value={formData.flight_id}
              required
            >
              <option value="" disabled>Select Flight</option>
              {flights.map((flight) => (
                <option key={flight.flight_id} value={flight.flight_id}>
                  {`${
                    airports[Number(flight.depart_airport_id) - 1]?.airport_name
                  } → ${airports[Number(flight.arrive_airport_id) - 1]?.airport_name}`}
                </option>
              ))}
            </select>
            <label>Passenger</label>
            <select
              name="passenger_id"
              onChange={handleInputChange}
              value={formData.passenger_id}
              required
            >
              <option value="" disabled>Select Passenger</option>
              {passengers.map((passenger) => (
                <option
                  key={passenger.passenger_id}
                  value={passenger.passenger_id}
                >
                  {`${passenger.first_name} ${passenger.last_name}`}
                </option>
              ))}
            </select>
          </fieldset>
          <div className="buttons-container">
            <input className="btn" type="submit" value="Add Passengers Flight" />
            <input
              className="btn"
              type="button"
              value="Cancel"
              onClick={() => navigate(-1)}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
