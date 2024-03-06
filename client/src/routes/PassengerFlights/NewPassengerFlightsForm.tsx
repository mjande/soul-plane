import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Axios from 'axios';
import { Passenger } from "../Passengers/Passengers";
import { Airport } from "../Airports";
import { useNavigate } from "react-router-dom";

interface Flights {
  flight_id: string;
  arrive_airport_id: string;
  depart_airport_id: string;
}

interface FormData {
  flight_id: string;
  passenger_id: string;
}

export default function NewPassengerFlights() {
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [flights, setFlights] = useState<Flights[]>([]);
  const [airports, setAirports] = useState<Airport[]>([]);
  const [formData, setFormData] = useState<FormData>({
    flight_id: '',
    passenger_id: '',
  });

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

  const navigate = useNavigate();

  function handleInputChange(event: ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await Axios.post(
        `http://${import.meta.env.VITE_HOST_NAME}:55767/passengerFlights`,
        formData
      );
      console.log(response);
      navigate("/PassengerFlights");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1>Passenger Flight</h1>

      <div id="insert">
        <form id="addPassengers" method="post" onSubmit={handleSubmit}>
          <legend>
            <strong>Add Passenger</strong>
          </legend>
          <fieldset className="fields">
            <label>Flight</label>
            <select
              name="flight_id"
              onChange={handleInputChange}
              value={formData.flight_id}
            >
              <option value="" disabled>Select Flight</option>
              {flights.map((flight) => (
                <option key={flight.flight_id} value={flight.flight_id}>
                  {`${
                    airports[Number(flight.arrive_airport_id) - 1]?.airport_name
                  } → ${airports[Number(flight.depart_airport_id) - 1]?.airport_name}`}
                </option>
              ))}
            </select>
            <label>Passenger</label>
            <select
              name="passenger_id"
              onChange={handleInputChange}
              value={formData.passenger_id}
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
            <input className="btn" type="submit" value="Add Passenger" />
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
