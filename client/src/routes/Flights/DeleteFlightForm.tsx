import Axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

interface Flight {
    flight_id: number,
    plane_id: number,
    plane_type: string,
    depart_airport_name: string,
    arrive_airport_name: string,
    depart_time: Date,
    arrive_time: Date
}

export default function DeleteFlightForm() {
    const { id } = useParams();

    const [flight, setFlight] = useState<Flight>({
        flight_id: 0,
        plane_id: 0,
        plane_type: '',
        depart_airport_name: '',
        arrive_airport_name: '',
        depart_time: new Date(),
        arrive_time: new Date()
    })

    useEffect(() => {
        async function getFlight() {
            const response = await Axios.get(`http://${import.meta.env.VITE_HOST_NAME}:55767/flights/${id}`)
            const data = response.data[0]

            setFlight({
                flight_id: data.flight_id,
                plane_id: data.plane_id,
                plane_type: data.plane_type,
                depart_airport_name: data.depart_airport_name,
                arrive_airport_name: data.arrive_airport_name,
                depart_time: data.depart_time,
                arrive_time: data.arrive_time
            })
        }

        getFlight()
    }, [id])
    
    return (
        <div id="delete">
            <form id="deleteFlight" method="post">
            <legend>
                <strong>Delete Flight</strong>
            </legend>
            <fieldset className="fields">
                <span>Are you sure you wish to delete the following? </span>
                <span>Flight ID: {flight.flight_id}</span>
                <span>Departure Airport: {flight.depart_airport_name}</span>
                <span>Arrival Airport: {flight.arrive_airport_name}</span>
                <span>Plane ID: {flight.plane_id} ({flight.plane_type})</span>
                <span>Depart Time: {new Date(flight.depart_time).toLocaleString()}</span>
                <span>Arrival Time: {new Date(flight.arrive_time).toLocaleString()}</span>
            </fieldset>
            <div className="buttons-container">
                <input className="btn" type="submit" value="Delete Flight" />
                <input className="btn" type="button" value="Cancel" />
            </div>
            </form>
        </div>    
    )
}
