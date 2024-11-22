import { FormEvent, useState, useEffect } from "react"
import Axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { Passenger } from "../../models";

export function DeletePassengerForm() {
    const { id } = useParams();

    // Initialize passengers data in client side
    const [formData, setFormData] = useState<Partial<Passenger>>({
        first_name: '',
        last_name: '',
        address: '',
        city: '',
        state: '',
        zipcode: '',
        passport_number: '',
    })

    // Get request for current passengers using its id
    useEffect(() => {
        async function getPassengers() {
            const response = await Axios.get(`${import.meta.env.VITE_BACKEND_HOST}/passengers/${id}`)
            const data = response.data[0]
            setFormData({
                first_name: data.first_name,
                last_name: data.last_name,
                address: data.address,
                city: data.city,
                state: data.state_abbr,
                zipcode: data.zip_code,
                passport_number: data.passport_number,
            })
        }
        getPassengers()
    }, [id])

    const navigate = useNavigate();
    
    // Handle deleting passenger form using delete request
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        try {
            const response = await Axios.delete(`${import.meta.env.VITE_BACKEND_HOST}/passengers/${id}`)
            console.log(response)
            navigate("/Passengers")
        } catch(error) {
            console.log(error)
        }
    }
    
    return (
        <div id="delete">
        <form id="deletePassengers" method="put" onSubmit={handleSubmit}>
          <legend>
            <strong>Delete Passenger</strong>
          </legend>
          <fieldset className="fields">
            <p>Are you sure you wish to delete the following?</p>
            <span>Passenger ID: {id}</span>
            <span>First Name: {formData.first_name}</span>
            <span>Last Name: {formData.last_name}</span>
            <span>Address: {formData.address}</span>
            <span>City: {formData.city}</span>
            <span>State Abbreviation: {formData.state}</span>
            <span>Zip Code: {formData.zipcode}</span>
            <span>Passport Number: {formData.passport_number}</span>
          </fieldset>
          <div className="buttons-container">
            <input className="btn" type="submit" value="Delete Passenger" />
            <input className="btn" type="button" value="Cancel" onClick={() => navigate(-1)}/>
          </div>
        </form>
      </div>   
    )
}
