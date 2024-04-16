import { FormEvent, useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Airport } from "../Airports/Airports";


// Define flights properties
interface Flights {
  flight_id: string;
  arrive_airport_id: string;
  depart_airport_id: string;
}

// Define Passenger Properties
interface Passenger {
  first_name: string;
  last_name: string;
}

export default function DeletePassengerFlightsForm() {
  const { fid, pid } = useParams<{ fid?: string; pid?: string }>();

  // Initialize airport, passenger, and flights data for client
  const [passenger, setPassenger] = useState<Passenger | null>(null);
  const [airports, setAirports] = useState<Airport[]>([]);
  const [flights, setFlights] = useState<Flights | null>(null);
  const [formData] = useState({
    flight_id: fid,
    passenger_id: pid,
  });

  // Grab current passenger based on passenger id 

  // Request adapted from Axios docs
  // Source URL: https://axios-http.com/docs/api_intro
  // Date: 3/16/24
  useEffect(() => {
    async function getPassenger() {
      try {
        const response = await Axios.get(
          `http://flip3.engr.oregonstate.edu:55767/passengers/${pid}`
        );
        const data = response.data[0];
        setPassenger({
          first_name: data.first_name,
          last_name: data.last_name,
        });
      } catch (error) {
        console.error("Error fetching passenger data:", error);
      }
    }
    getPassenger();
  }, [pid]);

  // Grab flights based on current flight id

  // Request adapted from Axios docs
  // Source URL: https://axios-http.com/docs/api_intro
  // Date: 3/16/24
  useEffect(() => {
    async function getFlights() {
      try {
        const response = await Axios.get(
          `http://flip3.engr.oregonstate.edu:55767/flights/${fid}`
        );
        const data = response.data[0];
        setFlights({
          flight_id: data.flight_id,
          arrive_airport_id: data.arrive_airport_id,
          depart_airport_id: data.depart_airport_id,
        });
      } catch (error) {
        console.error("Error fetching Flights data:", error);
      }
    }
    getFlights();
  }, [fid]);

  // Get request for grabbing airport data 

  // Request adapted from Axios docs
  // Source URL: https://axios-http.com/docs/api_intro
  // Date: 3/16/24
  useEffect(() => {
    Axios.get(`http://flip3.engr.oregonstate.edu:55767/airports`).then((response) => {
      setAirports(response.data);
    });
  }, []);

  const navigate = useNavigate();

  // Handle deleting passenger flights 

  // Request adapted from Axios docs
  // Source URL: https://axios-http.com/docs/api_intro
  // Date: 3/16/24
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await Axios.delete(
        `http://flip3.engr.oregonstate.edu:55767/passengerFlights/${fid}/${pid}`,
        {data: formData}
      );

      console.log(response);
      navigate("/PassengerFlights");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div id="delete">
      <form id="deletePassengerFlights" method="delete" onSubmit={handleSubmit}>
        <legend>
          <strong>Delete Passenger Flight</strong>
        </legend>
        <fieldset>
        <p>Are you sure you wish to delete the following?</p>
          {flights && (
            <div>
              <span>Flight: </span>
              {airports[Number(flights.depart_airport_id) - 1]?.airport_name} <span>&#8594;</span> {airports[Number(flights.arrive_airport_id) - 1]?.airport_name}
            </div>
          )}

          {passenger && (
            <div>
              <span>Name: {passenger.first_name} {passenger.last_name}</span>
            </div>
          )}
        </fieldset>

        <div className="buttons-container">
          <input
            className="btn"
            type="submit"
            value="Delete Passenger Flight"
          />
          <input
            className="btn"
            type="button"
            value="Cancel"
            onClick={() => navigate(-1)}
          />
        </div>
      </form>
    </div>
  );
}
