import { FormEvent, ChangeEvent, useState, useEffect } from "react"
import Axios from "axios"
import { useNavigate, useParams } from "react-router-dom"


// Define Plane Type property
interface FormData {
    type_name: string,
    capacity: number,
    range_in_hrs: number
}

export default function UpdatePlaneTypeForm() {
    const { id } = useParams();
    // Initialize formData of plane type for client
    const [formData, setFormData] = useState<FormData>({
        type_name: '',
        capacity: 0,   
        range_in_hrs: 0,
    })

    // Get request for current plane type using plane type id

    // Request adapted from Axios docs
    // Source URL: https://axios-http.com/docs/api_intro
    // Date: 3/16/24
    useEffect(() => {
        async function getPlaneType() {
            const response = await Axios.get(`http://flip3.engr.oregonstate.edu:55767/plane-types/${id}`)
            const data = response.data[0]

            setFormData({
                type_name: data.type_name,
                capacity: data.capacity,
                range_in_hrs: data.range_in_hrs
            })
        }

        getPlaneType()
    }, [id])

    const navigate = useNavigate();

    // Handle input change for plane type form
    async function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }))
    }

    // Handle updating plane type form using put request for current plane type

    // Request adapted from Axios docs
    // Source URL: https://axios-http.com/docs/api_intro
    // Date: 3/16/24
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        try {
            const response = await Axios.put(`http://flip3.engr.oregonstate.edu:55767/plane-types/${id}`, formData)
            console.log(response)
            navigate("/PlaneTypes")
        } catch(error) {
            console.log(error)
        }
    }
    
    return (
        <div>
            <h1>Plane Types</h1>
        
            <div id="update">
            <form id="updatePlaneType" method="put" onSubmit={handleSubmit}>
                <legend>
                <strong>Update Plane Type</strong>
                </legend>
            <fieldset className="fields">
            <span>Plane Type ID: {id}</span>
                <label>Type Name</label>
                <input type="text" name="type_name" value={formData.type_name} onChange={handleInputChange} required/>
                <label>Capacity</label>
                <input type="number" name="capacity" value={formData.capacity} onChange={handleInputChange} required />
                <label>Range (hrs)</label>
                <input type="number" name="range_in_hrs" value={formData.range_in_hrs} onChange={handleInputChange} required />
                </fieldset>
                <div className="buttons-container">
                <input className="btn" type="submit" value="Update Plane Type" />
                <input className="btn" type="button" value="Cancel" onClick={() => navigate(-1)}/>
                </div>
            </form>
            </div>    
        </div>
    )
}
