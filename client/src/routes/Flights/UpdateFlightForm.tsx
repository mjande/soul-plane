import { FormEvent, ChangeEvent, useState, useEffect } from "react"
import Axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { convertToDateTimeLocalString } from "../../utils/utils"


interface Flight {
    flight_id: number,
    plane_id: number,
    plane_type: string,
    depart_airport_name: string,
    arrive_airport_name: string,
    depart_time: Date,
    arrive_time: Date
}

interface Airport {
    airport_id: number,
    airport_name: string
}

interface Plane {
    plane_id: number,
    plane_type: string
}

interface FormData {
    depart_airport_id: number,
    arrive_airport_id: number,
    plane_id: number,
    depart_time: string,
    arrive_time: string
}

export function UpdateFlightForm() {
    const { id } = useParams()
    
    const [formData, setFormData] = useState<FormData>({
        depart_airport_id: 1,
        arrive_airport_id: 2, 
        plane_id: 1,
        depart_time: convertToDateTimeLocalString(new Date()),
        arrive_time: convertToDateTimeLocalString(new Date())
    })
    const [airports, setAirports] = useState<Airport[]>([])
    const [planes, setPlanes] = useState<Plane[]>([])

    useEffect(() => {        
        async function getFlight() {
            const response = await Axios.get(`http://${import.meta.env.VITE_HOST_NAME}:55767/flights/${id}`)
            const flight = response.data[0]
            
            setFormData({
                depart_airport_id: flight.depart_airport_id,
                arrive_airport_id: flight.arrive_airport_id,
                plane_id: flight.plane_id,
                depart_time: convertToDateTimeLocalString(flight.depart_time),
                arrive_time: convertToDateTimeLocalString(flight.arrive_time)
            })
        }

        async function getAirports() {
            const response = await Axios.get(`http://${import.meta.env.VITE_HOST_NAME}:55767/Airports`)
            setAirports(response.data)
        }

        async function getPlanes() {
            const response = await Axios.get(`http://${import.meta.env.VITE_HOST_NAME}:55767/Planes`)
            setPlanes(response.data)
        }

        getFlight()
        getAirports()
        getPlanes()
    }, [id])


    return (
        <div id="update">
        <form id="updateFlight" method="post">
          <legend>
            <strong>Update Flight</strong>
          </legend>
          <fieldset className="fields">
            <span>Flight ID: {id}</span>
            <label>Departure Airport</label>
            <select name="depart_airport_id">
              {airports.map(airport => (
                <option key={airport.airport_id} value={airport.airport_id}>{airport.airport_name}</option>
              ))}
            </select>
            <label>Arrival Airport</label>
            <select name="arrive_airport_id">
              {airports.map(airport => (
                <option key={airport.airport_id} value={airport.airport_id}>{airport.airport_name}</option>
              ))}
            </select>
            <label>Plane</label>
            <select name="plane_id">
              {planes.map(plane => (
                <option key={plane.plane_id} value={plane.plane_id}>{plane.plane_id} ({plane.plane_type})</option>
              ))}
            </select>
            <label>Departure Time</label> <input type="datetime-local" value="2024-02-05T14:30" name="depart_time" />
            <label>Arrival Time</label> <input type="datetime-local" value="2024-02-11T02:15" name="arrive_time" />
          </fieldset>
          <div className="buttons-container">
            <input className="btn" type="submit" value="Save Update Flight" />
            <input className="btn" type="button" value="Cancel" />
          </div>
        </form>
      </div>    
    )
}
