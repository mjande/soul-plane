import { FormEvent, useState, useEffect, ChangeEvent } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Airport } from "../Airports/Airports";

// Define flights property
interface Flights {
  flight_id: string;
  arrive_airport_id: string;
  depart_airport_id: string;
}

// Define passenger property
interface Passenger {
  passenger_id: string;
  first_name: string;
  last_name: string;
}

export default function UpdatePassengerForm() {
  // Grab flight id and passenger id and initialize data for flights, passengers, airports, and passenger flights
  const { fid, pid } = useParams();
  const [originalFid] = useState(fid);
  const [originalPid] = useState(pid);
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [flights, setFlights] = useState<Flights[]>([]);
  const [airports, setAirports] = useState<Airport[]>([]);
  const [formData, setFormData] = useState({
    flight_id: fid,
    passenger_id: pid,
  });

  // Grab airports using a get request to the backend
  useEffect(() => {
    Axios.get(`http://${import.meta.env.VITE_HOST_NAME}:55767/airports`).then((response) => {
      setAirports(response.data);
    });
  }, []);

  // Get request for passengers and flights
  useEffect(() => {
    async function getPassengers() {
      try {
        const response = await Axios.get(
          `http://${import.meta.env.VITE_HOST_NAME}:55767/passengers`
        );
        setPassengers(response.data);
      } catch (error) {
        console.error("Error fetching passengers data:", error);
      }
    }
    getPassengers();
  }, []);

  useEffect(() => {
    async function getFlights() {
      try {
        const response = await Axios.get(
          `http://${import.meta.env.VITE_HOST_NAME}:55767/flights`
        );
        setFlights(response.data);
      } catch (error) {
        console.error("Error fetching Flights data:", error);
      }
    }
    getFlights();
  }, []);

  const navigate = useNavigate();

  // Handle input changes for updating passenger flights
  async function handleInputChange(event: ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.target;
    console.log(name, value)
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  // Handle updating passenger flight form using put request
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await Axios.put(
        `http://${import.meta.env.VITE_HOST_NAME}:55767/passengerFlights/${originalFid}/${originalPid}`,
        formData
      );

      console.log('submit response',response);
      navigate("/PassengerFlights");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1>Update Passenger</h1>

      <div id="update">
        <form id="updatePassengerFlights" method="put" onSubmit={handleSubmit}>
          <legend>
            <strong>Update Passenger Flights</strong>
          </legend>
          <fieldset className="fields">
            <label>Flight</label>
            <select
              name="flight_id"
              onChange={handleInputChange}
              value={formData.flight_id}
            >
              <option value="">Select Flight</option>
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
            >
              <option value="">Select Passenger</option>
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
            <input className="btn" type="submit" value="Update Passenger Flights" />
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
