import { FormEvent, ChangeEvent, useState, useEffect } from "react"
import Axios from "axios"
import { useNavigate } from "react-router-dom"

interface PlaneType {
    plane_type_id: number,
    type_name: string,
    capacity: number,
    range_in_hrs: number
  }

interface Airport {
    airport_id: number;
    airport_name: string;
    airport_code?: string;
    location?: string;
}

interface FormData {
    plane_type_id: number,
    current_airport_id?: number
}

export default function NewPlaneForm() {
    const [planeTypes, setPlaneTypes] = useState<PlaneType[]>([]);
    const [airports, setAirports] = useState<Airport[]>([]);
    
    useEffect(() => {
        // Get planeTypes for planeTypes dropdown
        async function getPlaneTypes() {
            const response = await Axios.get(`http://${import.meta.env.VITE_HOST_NAME}:55767/plane-types`);
            setPlaneTypes(response.data)
        }
        
        // Get airports for airports dropdown
        async function getAirports() {
            const response = await Axios.get(`http://${import.meta.env.VITE_HOST_NAME}:55767/Airports`);
            response.data.push({ airport_id: "", airport_name: "Currently Unavailable" })
            setAirports(response.data)
        }

        getPlaneTypes()
        getAirports()     
      }, []);
    
    // Establish initial dropdown values
    const [formData, setFormData] = useState<FormData>({
        plane_type_id: 1,
        current_airport_id: 1
    })

    const navigate = useNavigate();

    async function handleInputChange(event: ChangeEvent<HTMLSelectElement>) {
        const { name, value } = event.target
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }))
    }
    
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        try {                        
            const response = await Axios.post(`http://${import.meta.env.VITE_HOST_NAME}:55767/planes`, formData)
            console.log(response)
            navigate("/Planes")
        } catch(error) {
            console.log(error)
        }
    }
    
    return (
        <div>
            <h1>Planes</h1>
        
            <div id="insert">
                <form id="addPlane" method="post" onSubmit={handleSubmit}>
                <legend>
                    <strong>Add Plane</strong>
                </legend>
                <fieldset className="fields">
                    <label>Plane Type</label>
                    <select name="plane_type_id" onChange={handleInputChange}>
                    {planeTypes.map((planeType) => (
                        <option value={planeType.plane_type_id} key={planeType.plane_type_id}>{planeType.type_name}</option> 
                    ))}
                    </select>
                    <label>Current Airport</label>
                    <select name="current_airport_id" onChange={handleInputChange} >
                    {airports.map((airport) => (
                        <option value={airport.airport_id} key={airport.airport_id}>{airport.airport_name}</option> 
                    ))}
                    </select>
                </fieldset>
                <div className="buttons-container">
                    <input className="btn" type="submit" value="Add Plane" />
                    <input className="btn" type="button" value="Cancel" onClick={() => navigate(-1)}/>
                </div>
                </form>
            </div>
        </div>
    )
}
