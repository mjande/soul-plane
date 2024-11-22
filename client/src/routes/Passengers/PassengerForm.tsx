import { FormEvent, ChangeEvent, useState, useEffect } from "react"
import Axios, { AxiosResponse } from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { Passenger } from "../../models";

export function PassengerForm() {
    const { id } = useParams();
    // Initialize passenger form data
    const [formData, setFormData] = useState<Partial<Passenger>>({})

    // Get request for current passenger
    useEffect(() => {
        async function getPassenger() {
            if (id) {
                const response = await Axios.get(`${import.meta.env.VITE_BACKEND_HOST}/passengers/${id}`)
                const passenger = response.data[0]
                setFormData(passenger)
            }
        }
        getPassenger()
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
            let response: AxiosResponse;

            if (id) {
                response = await Axios.put(`${import.meta.env.VITE_BACKEND_HOST}/passengers/${id}`, formData)
            } else {
                response = await Axios.post(`${import.meta.env.VITE_BACKEND_HOST}/passengers`, formData)
            }
            console.log(response)
            navigate("/Passengers")
        } catch(error) {
            console.log(error)
        }
    }
    
    return (
        <div>
            <h1>Passengers</h1>
        
            <div>
            <form onSubmit={handleSubmit}>
                <legend>
                <strong>{ id ? 'Update Passenger' : 'Create Passenger' }</strong>
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
                    <input type="text" name="state" onChange={handleInputChange} value={formData.state} required placeholder="OR" maxLength={2} pattern="[A-Z]{2}"/>
                    <label>Zip Code</label>
                    <input type="text" pattern="[0-9]{5}" name="zipcode" onChange={handleInputChange} value={formData.zipcode} required placeholder="99999" maxLength={5}/>
                    <label>Passport Number</label>
                    <input type="text" name="passport_number" onChange={handleInputChange} value={formData.passport_number} required maxLength={20}/>
                </fieldset>
                <div className="buttons-container">
                    <input className="btn" type="submit" value={ id ? "Update Passenger" : "Create Passenger" } />
                    <input className="btn" type="button" value="Cancel" onClick={() => navigate(-1)}/>
                </div>
            </form>
            </div>    
        </div>
    )
}
