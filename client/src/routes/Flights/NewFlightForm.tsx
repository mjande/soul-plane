import { FormEvent, ChangeEvent, useState, useEffect } from "react"
import Axios from "axios"
import { useNavigate } from "react-router-dom"
import { convertToDateTimeLocalString } from "../../utils/utils"

interface FormData {
    depart_airport_id: number,
    arrive_airport_id: number,
    plane_id: number,
    depart_time: string,
    arrive_time: string
}

interface Airport {
    airport_id: number,
    airport_name: string
}

interface Plane {
    plane_id: number,
    plane_type: string
}

export default function NewFlightForm() {
    // Generate default values for departure and arrival times
    const departDefault = new Date()
    const arriveDefault = new Date()
    arriveDefault.setHours(departDefault.getHours() + 3)
    
    const [formData, setFormData] = useState<FormData>({
        depart_airport_id: 1,
        arrive_airport_id: 2,
        plane_id: 1,
        depart_time: convertToDateTimeLocalString(departDefault),
        arrive_time: convertToDateTimeLocalString(arriveDefault)
    })
    const [airports, setAirports] = useState<Airport[]>([])
    const [planes, setPlanes] = useState<Plane[]>([])

    useEffect(() => {
        async function getAirports() {
            const response = await Axios.get(`http://${import.meta.env.VITE_HOST_NAME}:55767/Airports`)
            setAirports(response.data)
        }

        async function getPlanes() {
            const response = await Axios.get(`http://${import.meta.env.VITE_HOST_NAME}:55767/Planes`)
            setPlanes(response.data)
        }

        getAirports()
        getPlanes()
    }, [])

    const navigate = useNavigate()

    async function handleInputChange(event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) {
        const { name, value } = event.target
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }))
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        try {                        
            const response = await Axios.post(`http://${import.meta.env.VITE_HOST_NAME}:55767/flights`, formData)
            console.log(response)
            navigate("/flights")
        } catch(error) {
            console.log(error)
        }
    }
    
    return (
    <div id="insert">
        <form id="addFlight" method="post" onSubmit={handleSubmit}>
        <legend>
            <strong>Add Flight</strong>
        </legend>
        <fieldset className="fields">
            <label>Departure Airport</label>
            <select name="depart_airport_id" onChange={handleInputChange} value={formData.depart_airport_id}>
                {airports.map(airport => (
                    <option key={airport.airport_id} value={airport.airport_id}>{airport.airport_name}</option>
                ))}
            </select>
            <label>Arrival Airport</label>
            <select name="arrive_airport_id"  onChange={handleInputChange} value={formData.arrive_airport_id}>
                {airports.map(airport => (
                    <option key={airport.airport_id} value={airport.airport_id}>{airport.airport_name}</option>
                ))}
            </select>
            <label>Plane ID</label>
            <select name="plane_id"  onChange={handleInputChange} value={formData.plane_id}>
            {planes.map(plane => (
                <option key={plane.plane_id} value={plane.plane_id}>{`${plane.plane_id} (${plane.plane_type})`}</option> 
            ))}
            </select>
            <label>Departure Date</label> <input type="datetime-local" name="depart_time"  onChange={handleInputChange} value={formData.depart_time}/>
            <label>Arrival Time</label> <input type="datetime-local" name="arrive_time"  onChange={handleInputChange} value={formData.arrive_time}/>
        </fieldset>
        <div className="buttons-container">
            <input className="btn" type="submit" value="Add Flight" />
            <input className="btn" type="button" value="Cancel" onClick={() => navigate(-1)}/>
        </div>
    </form>
  </div>)
}
