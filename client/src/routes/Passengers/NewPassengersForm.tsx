import { FormEvent, ChangeEvent, useState } from "react"
import Axios from "axios"
import { useNavigate } from "react-router-dom"


// Define Passengers property
interface FormData {
    first_name: string,
    last_name: string,
    phone: string,
    email: string,
    address: string,
    city: string,
    state_abbr: string,
    zip_code: number,
    passport_number: string,
}

export default function NewPassengersForm() {
    // Initialize passenger data on clientside
    const [formData, setFormData] = useState<FormData>({
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
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
            const response = await Axios.post(`http://${import.meta.env.VITE_HOST_NAME}:55767/passengers`, formData)
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
                    <label>First Name</label>
                    <input type="text" name="first_name" onChange={handleInputChange} required/>
                    <label>Last Name</label>
                    <input type="text" name="last_name" onChange={handleInputChange} required />
                    <label>Phone</label>
                    {/* 
                        Pattern for validating phone numbers from MDN Web Docs
                        Source URL: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/tel
                        Date: 3/13/24 
                    */}
                    <input type="tel" name="phone" onChange={handleInputChange} required pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-456-7890"/>
                    <label>Email</label>
                    <input type="email" name="email" onChange={handleInputChange} required placeholder="username@email.com"/>
                    <label>Address</label>
                    <input type="text" name="address" onChange={handleInputChange} required/>
                    <label>City</label>
                    <input type="text" name="city" onChange={handleInputChange} required />
                    <label>State </label>
                    <input type="text" name="state_abbr" onChange={handleInputChange} required placeholder="OR" maxLength={2}/>
                    <label>Zip Code</label>
                    <input type="text" pattern="[0-9]{5}" name="zip_code" onChange={handleInputChange} required placeholder="99999" maxLength={5}/>
                    <label>Passport Number</label>
                    <input type="text" name="passport_number" onChange={handleInputChange} required maxLength={9}/>
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
