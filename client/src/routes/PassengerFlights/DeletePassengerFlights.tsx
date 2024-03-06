import { FormEvent, useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Airport } from "../Airports";

interface Flights {
  flight_id: string;
  arrive_airport_id: string;
  depart_airport_id: string;
}

interface Passenger {
  first_name: string;
  last_name: string;
}

export default function DeletePassengerFlightsForm() {
  const { fid, pid } = useParams<{ fid?: string; pid?: string }>();
  const [passenger, setPassenger] = useState<Passenger | null>(null);
  const [airports, setAirports] = useState<Airport[]>([]);
  const [flights, setFlights] = useState<Flights | null>(null);

  useEffect(() => {
    async function getPassenger() {
      try {
        const response = await Axios.get(
          `http://${import.meta.env.VITE_HOST_NAME}:55767/passengers/${pid}`
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

  useEffect(() => {
    async function getFlights() {
      try {
        const response = await Axios.get(
          `http://${import.meta.env.VITE_HOST_NAME}:55767/flights/${fid}`
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

  useEffect(() => {
    Axios.get(`http://${import.meta.env.VITE_HOST_NAME}:55767/airports`).then((response) => {
      setAirports(response.data);
    });
  }, []);

  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await Axios.delete(
        `http://${import.meta.env.VITE_HOST_NAME}:55767/passengerFlights/${fid}/${pid}`
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
        <p>Are you sure you wish to delete the following?</p>

        {flights && (
          <div>
            <span>Flight: </span>
            {airports[Number(flights.arrive_airport_id) - 1]?.airport_name} <span>&#8594;</span> {airports[Number(flights.depart_airport_id) - 1]?.airport_name}
          </div>
        )}

        {passenger && (
          <div>
            <span>Name: {passenger.first_name} {passenger.last_name}</span>
          </div>
        )}

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
