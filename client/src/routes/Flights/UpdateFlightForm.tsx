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
            <span>Flight ID: 1</span>
            <label>Departure Airport</label>
            <select name="depart_airport_id">
              <option value="1">Portland International Airport</option>
              <option value="2">Seattle-Tacoma International</option>
              <option value="3">Spokane International Airport</option>
            </select>
            <label>Arrival Airport</label>
            <select name="arrive_airport_id">
              <option value="1">Portland International Airport</option>
              <option value="2">Seattle-Tacoma International</option>
              <option value="3">Spokane International Airport</option>
            </select>
            <label>Plane</label>
            <select name="plane_id">
              <option value="1">Plane #1 (Airbus A320-200)</option>
              <option value="2">Plane #2 (Boeing B737-800)</option>
              <option value="3">Plane #3 (Embraer 135)</option>
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
