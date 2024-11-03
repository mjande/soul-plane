import { FormEvent, ChangeEvent, useState } from "react"
import Axios from "axios"
import { useNavigate } from "react-router-dom"


// Define Passengers property
interface FormData {
    username: string,
    first_name: string,
    last_name: string,
    address: string,
    city: string,
    state_abbr: string,
    zip_code: number,
    passport_number: string,
}

export default function NewPassengersForm() {
    // Initialize passenger data on clientside
    const [formData, setFormData] = useState<FormData>({
        username: '',
        first_name: '',
        last_name: '',
        address: '',
        city: '',
        state_abbr: '',
        zip_code: 0,
        passport_number: '',
    })
    const navigate = useNavigate();

    // Handle input change on passengers form
    async function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }))
    }
    
    // Handle adding new passengers using a post request
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        try {
            const response = await Axios.post(`${import.meta.env.VITE_BACKEND_HOST}/passengers`, formData)
            console.log(response)
            navigate("/Passengers")
        } catch(error) {
            console.log(error)
        }
    }
    
    return (
        <div>
            <h1>Passengers</h1>
        
            <div id="insert">
            <form id="addPassengers" method="post" onSubmit={handleSubmit}>
                <legend>
                <strong>Add Passenger</strong>
                </legend>
                <fieldset className="fields">
                    <label>Username</label>
                    <input type="text" name="username" onChange={handleInputChange} required />
                    <label>First Name</label>
                    <input type="text" name="first_name" onChange={handleInputChange} required />
                    <label>Last Name</label>
                    <input type="text" name="last_name" onChange={handleInputChange} required />
                    <label>Address</label>
                    <input type="text" name="address" onChange={handleInputChange} required/>
                    <label>City</label>
                    <input type="text" name="city" onChange={handleInputChange} required />
                    <label>State</label>
                    <input type="text" name="state_abbr" onChange={handleInputChange} required placeholder="OR" maxLength={2}/>
                    <label>Zip Code</label>
                    <input type="text" pattern="[0-9]{5}" name="zip_code" onChange={handleInputChange} required placeholder="99999" maxLength={5}/>
                    <label>Passport Number</label>
                    <input type="text" name="passport_number" onChange={handleInputChange} required maxLength={20}/>
                </fieldset>
                <div className="buttons-container">
                    <input className="btn" type="submit" value="Add Passenger" />
                    <input className="btn" type="button" value="Cancel" onClick={() => navigate(-1)}/>
                </div>
            </form>
            </div>    
        </div>
    )
}
