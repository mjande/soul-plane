import { FormEvent, ChangeEvent, useState, useEffect } from "react"
import Axios, { AxiosResponse } from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { convertToDateTimeLocalString } from "../../utils/utils"
import { Flight, Airport, PlaneView } from "../../models"

export function FlightForm() {
    const { id } = useParams()
    
    // Initialize Flight Form Data
    const [formData, setFormData] = useState<Partial<Flight>>({})
    const [airports, setAirports] = useState<Airport[]>([])
    const [planes, setPlanes] = useState<PlaneView[]>([])

    // Get request for current flight, airports, and planes 
    useEffect(() => {        
        async function getFlight() {
          if (id) {
            const response = await Axios.get(`${import.meta.env.VITE_BACKEND_HOST}/flights/${id}`)
            const flight = response.data[0]

            setFormData({
                flight_id: flight.flight_id,
                depart_airport_id: flight.depart_airport_id,
                arrive_airport_id: flight.arrive_airport_id,
                plane_id: flight.plane_id,
                depart_time: convertToDateTimeLocalString(new Date(flight.depart_time)),
                arrive_time: convertToDateTimeLocalString(new Date(flight.arrive_time))
            })
          } else {
            setFormData({
              depart_time: convertToDateTimeLocalString(new Date()),
              arrive_time: convertToDateTimeLocalString(new Date()),
            })
          }
        }

        async function getAirports() {
            const response = await Axios.get(`${import.meta.env.VITE_BACKEND_HOST}/Airports`)
            setAirports(response.data)
        }

        async function getPlanes() {
            const response = await Axios.get(`${import.meta.env.VITE_BACKEND_HOST}/Planes`)
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
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        try {      
          let response: AxiosResponse;
          if (id) {
            response = await Axios.put(`${import.meta.env.VITE_BACKEND_HOST}/flights/${formData.flight_id}`, formData)
          } else {
            response = await Axios.post(`${import.meta.env.VITE_BACKEND_HOST}/flights`, formData)
          }

          console.log(response)
          navigate("/flights")
        } catch(error) {
          console.log(error)
        }
    }

    return (
        <div>
        <form onSubmit={handleSubmit}>
          <legend>
            <strong>{ id ? 'Update Flight' : 'Create Flight' }</strong>
          </legend>

          <fieldset className="fields">
            { id && <span>Flight ID: {id}</span> }

            <label>Departure Airport</label>
            <select name="depart_airport_id" value={formData.depart_airport_id} onChange={handleInputChange} required>
              <option value="">Select Departure Airport</option>
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
              <option value="">Select Arrival Airport</option>
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
              <option value="">Select Plane</option>
              {planes.map(plane => (
                <option key={plane.plane_id} value={plane.plane_id}>{plane.plane_id} ({plane.plane_type})</option>
              ))}
            </select>
            <label>Departure Time</label> <input type="datetime-local" name="depart_time" value={formData.depart_time} onChange={handleInputChange} required/>
            <label>Arrival Time</label> <input type="datetime-local" name="arrive_time" value={formData.arrive_time} onChange={handleInputChange} required/>
          </fieldset>

          <div className="buttons-container">
            <input className="btn" type="submit" value={ id ? "Update Flight" : "Create Flight" } />
            <input className="btn" type="button" value="Cancel" onClick={() => navigate(-1)}/>
          </div>
        </form>
      </div>    
    )
}