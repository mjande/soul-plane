import { FormEvent, ChangeEvent, useState } from "react"
import Axios from "axios"
import { useNavigate } from "react-router-dom"

// Define airport properties in Form Data
interface FormData {
    airport_id: number;
    airport_name: string;
    airport_code: string;
    location: string;
}

export default function NewAirports() {
    // Initialize Airport FormData
    const [formData, setFormData] = useState<FormData>({
        airport_id: 0,
        airport_name: '',
        airport_code: '',
        location: '',
    })
    const navigate = useNavigate();

    // Track input change
    async function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }))
    }

    // Handle submitting data for new airports
    // https://axios-http.com/docs/api_intro
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        try {
            const response = await Axios.post(`http://${import.meta.env.VITE_HOST_NAME}:55767/airports`, formData)
            console.log(response)
            navigate("/Airports")
        } catch(error) {
            console.log(error)
        }
    }
    
    return (
        <div>
            <h1>Airport</h1>
        
            <div id="insert">
                <form id="addAirport" onSubmit={handleSubmit} method="post">
                    <legend>
                        <strong>Add Airport</strong>
                    </legend>
                    <fieldset className="fields">
                    <label>Airport Name</label> <input type="text" name="airport_name" onChange={handleInputChange} className="long-text-input" required placeholder="Airport Name"/>
                    <label>Airport Code</label> <input type="text" name="airport_code" onChange={handleInputChange} className="short-text-input" maxLength={3} required placeholder="ABC" />
                    <label>Location</label> <input type="text" name="location" onChange={handleInputChange} required placeholder="City, ST" />
                    </fieldset>
                    <div className="buttons-container">
                    <input className="btn" type="submit" value="Add Airport" />
                    <input className="btn" type="button" value="Cancel" onClick={() => navigate(-1)}/>
                    </div>
                </form>
            </div> 
        </div>
    )
}
