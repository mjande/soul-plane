import { FormEvent, useState, useEffect } from "react"
import Axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

interface FormData {
    airport_id: number;
    airport_name: string;
    airport_code: string;
    location: string;
}

export default function DeleteAirports() {
    const { id } = useParams();
    const [formData, setFormData] = useState<FormData>({
        airport_id: 0,
        airport_name: "",
        airport_code: "",
        location: "",
    })

    useEffect(() => {
        async function getPassengers() {
            const response = await Axios.get(`http://${import.meta.env.VITE_HOST_NAME}:55767/airports/${id}`)
            const data = response.data[0]
            setFormData({
                airport_id: data.airport_id,
                airport_name: data.airport_name,
                airport_code: data.airport_code,
                location: data.location,
            })
        }
        getPassengers()
    }, [id])

    const navigate = useNavigate();
    
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        try {
            const response = await Axios.delete(`http://${import.meta.env.VITE_HOST_NAME}:55767/airports/${id}`)
            console.log(response)
            navigate("/Airports")
        } catch(error) {
            console.log(error)
        }
    }
    
    return (
        <div id="delete">
        <form id="deleteAirport" method="delete" onSubmit={handleSubmit}>
          <legend>
            <strong>Delete Airport</strong>
          </legend>
          <fieldset className="fields">
            <p>Are you sure you wish to delete the following?</p>
            <span>Airport ID: {id}</span>
            <span>Airport Name: {formData.airport_name}</span>
            <span>Airport Code: {formData.airport_code}</span>
            <span>Location: {formData.location}</span>
          </fieldset>
          <div className="buttons-container">
            <input className="btn" type="submit" value="Delete Airport" />
            <input className="btn" type="button" value="Cancel" onClick={() => navigate(-1)}/>
          </div>
        </form>
      </div>   
    )
}
