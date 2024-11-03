import { FormEvent, ChangeEvent, useState, useEffect } from "react"
import Axios from "axios"
import { useNavigate, useParams } from "react-router-dom"


// Define passenger properties
interface FormData {
    username: string,
    first_name: string,
    last_name: string,
    phone: string,
    address: string,
    city: string,
    state_abbr: string,
    zip_code: number,
    passport_number: string,
}

export default function UpdatePassengersForm() {
    const { id } = useParams();
    // Initialize passenger form data
    const [formData, setFormData] = useState<FormData>({
        username: '',
        first_name: '',
        last_name: '',
        phone: '',
        address: '',
        city: '',
        state_abbr: '',
        zip_code: 0,
        passport_number: '',
    })

    // Get request for current passenger
    useEffect(() => {
        async function getPassengers() {
            const response = await Axios.get(`${import.meta.env.VITE_BACKEND_HOST}/passengers/${id}`)
            const data = response.data[0]
            setFormData({
                username: data.username,
                first_name: data.first_name,
                last_name: data.last_name,
                phone: data.phone,
                address: data.address,
                city: data.city,
                state_abbr: data.state_abbr,
                zip_code: data.zip_code,
                passport_number: data.passport_number,
            })
        }
        getPassengers()
    }, [id])

    const navigate = useNavigate();

    // Handle input change for passenger form
    async function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }))
    }
    
    // Handle updating current passenger using a put request
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        try {
            const response = await Axios.put(`${import.meta.env.VITE_BACKEND_HOST}/passengers/${id}`, formData)
            console.log(response)
            navigate("/Passengers")
        } catch(error) {
            console.log(error)
        }
    }
    
    return (
        <div>
            <h1>Passengers</h1>
        
            <div id="update">
            <form id="updatePassengers" method="put" onSubmit={handleSubmit}>
                <legend>
                <strong>Update Passenger</strong>
                </legend>
                <fieldset className="fields">
                    <label>Username</label>
                    <input type="text" value={formData.username} disabled />
                    <label>First Name</label>
                    <input type="text" name="first_name" onChange={handleInputChange} value={formData.first_name} required/>
                    <label>Last Name</label>
                    <input type="text" name="last_name" onChange={handleInputChange} value={formData.last_name} required />
                    <label>Address</label>
                    <input type="text" name="address" onChange={handleInputChange} value={formData.address} required />
                    <label>City</label>
                    <input type="text" name="city" onChange={handleInputChange} value={formData.city} required/>
                    <label>State</label>
                    <input type="text" name="state_abbr" onChange={handleInputChange} value={formData.state_abbr} required placeholder="OR" maxLength={2} pattern="[A-Z]{2}"/>
                    <label>Zip Code</label>
                    <input type="text" pattern="[0-9]{5}" name="zip_code" onChange={handleInputChange} value={formData.zip_code} required placeholder="99999" maxLength={5}/>
                    <label>Passport Number</label>
                    <input type="text" name="passport_number" onChange={handleInputChange} value={formData.passport_number} required maxLength={20}/>
                </fieldset>
                <div className="buttons-container">
                    <input className="btn" type="submit" value="Update Passenger" />
                    <input className="btn" type="button" value="Cancel" onClick={() => navigate(-1)}/>
                </div>
            </form>
            </div>    
        </div>
    )
}
