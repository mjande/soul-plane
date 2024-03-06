import { FormEvent, ChangeEvent, useState } from "react"
import Axios from "axios"
import { useNavigate } from "react-router-dom"

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

    async function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }))
    }
    
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
                    <input type="text" name="first_name" onChange={handleInputChange}/>
                    <label>Last Name</label>
                    <input type="text" name="last_name" onChange={handleInputChange}/>
                    <label>Phone</label>
                    <input type="tel" name="phone" onChange={handleInputChange}/>
                    <label>Email</label>
                    <input type="email" name="email" onChange={handleInputChange}/>
                    <label>Address</label>
                    <input type="text" name="address" onChange={handleInputChange}/>
                    <label>City</label>
                    <input type="text" name="city" onChange={handleInputChange}/>
                    <label>State</label>
                    <input type="text" name="state_abbr" onChange={handleInputChange}/>
                    <label>Zip Code</label>
                    <input type="text" pattern="[0-9]{5}" name="zip_code" onChange={handleInputChange}/>
                    <label>Passport Number</label>
                    <input type="text" name="passport_number" onChange={handleInputChange}/>
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