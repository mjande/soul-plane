import { FormEvent, ChangeEvent, useState, useEffect } from "react"
import Axios from "axios"
import { useNavigate, useParams } from "react-router-dom"


// Define PlaneType property
interface PlaneType {
    plane_type_id: number,
    type_name: string,
    capacity: number,
    range_in_hrs: number
  }

// Define Airport property
interface Airport {
    airport_id: number;
    airport_name: string;
    airport_code?: string;
    location?: string;
}


// Define plane property
interface FormData {
    plane_type_id: number,
    current_airport_id?: number
}

export default function UpdatePlaneForm() {
    const { id } = useParams();
    //Initialize plane types, airports, and planes data for client
    const [planeTypes, setPlaneTypes] = useState<PlaneType[]>([])
    const [airports, setAirports] = useState<Airport[]>([])
    
    const [formData, setFormData] = useState<FormData>({
        plane_type_id: 1,
        current_airport_id: 1
    })


    useEffect(() => {
        // Get request to grab the current plane using plane id
        // https://axios-http.com/docs/api_intro
        async function getPlane() {
            const response = await Axios.get(`http://flip3.engr.oregonstate.edu:55767/planes/${id}`)
            const data = response.data[0] 

            setFormData({
                plane_type_id: data.plane_type_id,
                current_airport_id: data.current_airport_id || ""
            })
        }

        // Get request to grab plane types data
        // https://axios-http.com/docs/api_intro
        async function getPlaneTypes() {
            const response = await Axios.get(`http://flip3.engr.oregonstate.edu:55767/plane-types`)
            setPlaneTypes(response.data)
        }

        // Get request to grab airports data
        // https://axios-http.com/docs/api_intro
        async function getAirports() {
            const response = await Axios.get(`http://flip3.engr.oregonstate.edu:55767/airports`)
            response.data.push({ airport_id: "", airport_name: "Currently Unavailable" })
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
    // https://axios-http.com/docs/api_intro
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        try {
            const response = await Axios.put(`http://flip3.engr.oregonstate.edu:55767/planes/${id}`, formData)
            console.log(response)
            navigate("/Planes")
        } catch(error) {
            console.log(error)
        }
    }
    
    return (
        <div>
            <h1>Planes</h1>
        
            <div id="update">
                <form id="updatePlane" method="post" onSubmit={handleSubmit}>
                <legend>
                    <strong>Update Plane</strong>
                </legend>
                <fieldset className="fields">
                    <span>Plane ID: {id}</span>

                    <label htmlFor="plane_type_id">Plane Type</label>
                    <select name="plane_type_id" onChange={handleSelectChange} value={formData.plane_type_id}>
                    {planeTypes.map((planeType) => (
                        <option key={planeType.plane_type_id} value={planeType.plane_type_id}>{planeType.type_name}</option>
                    ))}
                    </select>

                    <label htmlFor="current_airport_id">Current Airport</label>
                    <select name="current_airport_id" onChange={handleSelectChange} value={formData.current_airport_id}>
                    {airports.map((airport) => (
                        <option key={airport.airport_id} value={airport.airport_id}>{airport.airport_name}</option>
                    ))}
                    </select>
                </fieldset>
                <div className="buttons-container">
                    <input className="btn" type="submit" value="Save Update Plane" />
                    <input className="btn" type="button" value="Cancel" onClick={() => navigate(-1)}/>
                </div>
                </form>
            </div>
        </div>
    )
}
