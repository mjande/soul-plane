import { FormEvent, ChangeEvent, useState, useEffect } from "react"
import Axios, { AxiosResponse } from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { Airport, Plane, PlaneType } from "../../models";

export function PlaneForm() {
    // Initialize plane types, airports, and planes data for client
    const { id } = useParams();
    const [planeTypes, setPlaneTypes] = useState<PlaneType[]>([])
    const [airports, setAirports] = useState<Airport[]>([])
    const [formData, setFormData] = useState<Partial<Plane>>({})


    useEffect(() => {
        // Get request to grab the current plane using plane id
        async function getPlane() {
            if (id) {
                const response = await Axios.get(`${import.meta.env.VITE_BACKEND_HOST}/planes/${id}`)
                const plane = response.data[0]; 
                setFormData(plane);
            }
        }

        // Get request to grab plane types data
        async function getPlaneTypes() {
            const response = await Axios.get(`${import.meta.env.VITE_BACKEND_HOST}/plane-types`)
            console.log(response.data);
            setPlaneTypes(response.data)
        }

        // Get request to grab airports data
        async function getAirports() {
            const response = await Axios.get(`${import.meta.env.VITE_BACKEND_HOST}/airports`)
            response.data.push({ airport_id: "-1", airport_name: "Currently Unavailable" })
            setAirports(response.data)
        }

        getPlane()
        getPlaneTypes()
        getAirports()

    }, [id])

    const navigate = useNavigate();

    // Handle select drop down change
    async function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
        const { name, value } = event.target

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }))
    }

    // Handle submitting updated plane form using put request
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        try {
            let response: AxiosResponse;
            if (id) {
                response = await Axios.put(`${import.meta.env.VITE_BACKEND_HOST}/planes/${id}`, formData)
            } else {
                response = await Axios.post(`${import.meta.env.VITE_BACKEND_HOST}/planes`, formData)
            }
            console.log(response)
            navigate("/planes")
        } catch(error) {
            console.log(error)
        }
    }
    
    return (
        <div>
            <h1>Planes</h1>
        
            <div id="update">
                <form id="updatePlane" onSubmit={handleSubmit}>
                <legend>
                    <strong>{ id ? 'Update Plane' : 'Create Plane' }</strong>
                </legend>
                <fieldset className="fields">
                    { id && <span>Plane ID: {id}</span> }

                    <label htmlFor="plane_type_id">Plane Type</label>
                    <select name="plane_type_id" onChange={handleSelectChange} value={formData.plane_type_id}>
                        <option value="">Select Plane Type</option>
                        {planeTypes.map((planeType) => (
                            <option key={planeType.plane_type_id} value={planeType.plane_type_id}>{planeType.type_name}</option>
                        ))}
                    </select>

                    <label htmlFor="current_airport_id">Current Airport</label>
                    <select name="current_airport_id" onChange={handleSelectChange} value={formData.current_airport_id}>
                        <option value="">Select Current Airport</option>
                        {airports.map((airport) => (
                            <option key={airport.airport_id} value={airport.airport_id}>{airport.airport_name}</option>
                        ))}
                    </select>
                </fieldset>
                <div className="buttons-container">
                    <input className="btn" type="submit" value={ id ? " Update Plane" : 'Create Plane' } />
                    <input className="btn" type="button" value="Cancel" onClick={() => navigate(-1)}/>
                </div>
                </form>
            </div>
        </div>
    )
}
