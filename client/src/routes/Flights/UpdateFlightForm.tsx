import { FormEvent, ChangeEvent, useState, useEffect } from "react"
import Axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { convertToDateTimeLocalString } from "../../utils/utils"

// Define Airport Property
interface Airport {
    airport_id: number,
    airport_name: string
}

// Define Plane Property
interface Plane {
    plane_id: number,
    plane_type: string
}

// Define Flight Property
interface FormData {
    flight_id: number,
    depart_airport_id: number,
    arrive_airport_id: number,
    plane_id: number,
    depart_time: string,
    arrive_time: string
}

export function UpdateFlightForm() {
    const { id } = useParams()
    
    // Initialize Flight Form Data
    const [formData, setFormData] = useState<FormData>({
        flight_id: 0,
        depart_airport_id: 1,
        arrive_airport_id: 2, 
        plane_id: 1,
        depart_time: convertToDateTimeLocalString(new Date()),
        arrive_time: convertToDateTimeLocalString(new Date())
    })
    const [airports, setAirports] = useState<Airport[]>([])
    const [planes, setPlanes] = useState<Plane[]>([])

    // Get request for current flight, airports, and planes
    // https://axios-http.com/docs/api_intro
    useEffect(() => {        
        async function getFlight() {
            const response = await Axios.get(`http://flip3.engr.oregonstate.edu:55767/flights/${id}`)
            const flight = response.data[0]

            setFormData({
                flight_id: flight.flight_id,
                depart_airport_id: flight.depart_airport_id,
                arrive_airport_id: flight.arrive_airport_id,
                plane_id: flight.plane_id,
                depart_time: convertToDateTimeLocalString(new Date(flight.depart_time)),
                arrive_time: convertToDateTimeLocalString(new Date(flight.arrive_time))
            })
        }

        async function getAirports() {
            const response = await Axios.get(`http://flip3.engr.oregonstate.edu:55767/Airports`)
            setAirports(response.data)
        }

        async function getPlanes() {
            const response = await Axios.get(`http://flip3.engr.oregonstate.edu:55767/Planes`)
            setPlanes(response.data)
        }

        getFlight()
        getAirports()
        getPlanes()
    }, [id])

    const navigate = useNavigate()

    // Handles flight form input change
    async function handleInputChange(event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) {
        const { name, value } = event.target
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }))
    }

    // Handle form submission for flight updates based on flight id
    // https://axios-http.com/docs/api_intro
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        try {                        
            const response = await Axios.put(`http://flip3.engr.oregonstate.edu:55767/flights/${formData.flight_id}`, formData)
            console.log(response)
            navigate("/flights")
        } catch(error) {
            console.log(error)
        }
    }

    return (
        <div id="update">
        <form id="updateFlight" method="put" onSubmit={handleSubmit}>
          <legend>
            <strong>Update Flight</strong>
          </legend>
          <fieldset className="fields">
            <span>Flight ID: {id}</span>
            <label>Departure Airport</label>
            <select name="depart_airport_id" value={formData.depart_airport_id} onChange={handleInputChange} required>
              {airports.map(airport => (
                <option 
                  key={airport.airport_id} 
                  value={airport.airport_id}
                  disabled={airport.airport_id == formData.arrive_airport_id}>
                    {airport.airport_name}
                </option>
              ))}
            </select>
            <label>Arrival Airport</label>
            <select name="arrive_airport_id" value={formData.arrive_airport_id} onChange={handleInputChange} required>
              {airports.map(airport => (
                <option 
                  key={airport.airport_id} 
                  value={airport.airport_id}
                  disabled={airport.airport_id == formData.depart_airport_id}> 
                    {airport.airport_name}
                </option>
              ))}
            </select>
            <label>Plane ID</label>
            <select name="plane_id" value={formData.plane_id} onChange={handleInputChange} required>
              {planes.map(plane => (
                <option key={plane.plane_id} value={plane.plane_id}>{plane.plane_id} ({plane.plane_type})</option>
              ))}
            </select>
            <label>Departure Time</label> <input type="datetime-local" name="depart_time" value={formData.depart_time} onChange={handleInputChange} required/>
            <label>Arrival Time</label> <input type="datetime-local" name="arrive_time" value={formData.arrive_time} onChange={handleInputChange} required/>
          </fieldset>
          <div className="buttons-container">
            <input className="btn" type="submit" value="Save Update Flight" />
            <input className="btn" type="button" value="Cancel" onClick={() => navigate(-1)}/>
          </div>
        </form>
      </div>    
    )
}
