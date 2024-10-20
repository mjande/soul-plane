import { FormEvent, useState, useEffect } from "react"
import Axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

// Define plane type property
interface PlaneType {
    type_name: string,
    capacity: 0,
    range_in_hrs: 0
}

export default function DeletePlaneTypeForm() {
    const { id } = useParams() 
    // Initialize plane type data into client
    const [planeType, setPlaneType] = useState<PlaneType>({
        type_name: '',
        capacity: 0,
        range_in_hrs: 0
    })

    // Get request for current plane type

    // Request adapted from Axios docs
    // Source URL: https://axios-http.com/docs/api_intro
    // Date: 3/16/24
    useEffect(() => {
        async function getPlaneType() {
            const response = await Axios.get(`http://${import.meta.env.VITE_BACKEND_HOST}/plane-types/${id}`)
            const data = response.data[0]

            setPlaneType({
                type_name: data.type_name,
                capacity: data.capacity,
                range_in_hrs: data.range_in_hrs
            })
        }

        getPlaneType()
    }, [id])

    const navigate = useNavigate()

    // Handle submitting delete request for current plane type

    // Request adapted from Axios docs
    // Source URL: https://axios-http.com/docs/api_intro
    // Date: 3/16/24
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        try {
            const response = await Axios.delete(`http://${import.meta.env.VITE_BACKEND_HOST}/plane-types/${id}`)
            console.log(response)
            navigate("/PlaneTypes")
        } catch(error) {
            console.log(error)
        }
    }
    
    return (
        <div id="delete">
        <form id="deletePlaneType" method="post" onSubmit={handleSubmit}>
          <legend>
            <strong>Delete Plane Type</strong>
          </legend>
          <fieldset className="fields">
            <p>Are you sure you wish to delete the following?</p>
            <span>Plane Type ID: {id}</span>
            <span>Type Name: {planeType.type_name}</span>
            <span>Capacity: {planeType.capacity}</span>
            <span>Range in Hours: {planeType.range_in_hrs}</span>
          </fieldset>
          <div className="buttons-container">
            <input className="btn" type="submit" value="Delete Plane Type" />
            <input className="btn" type="button" value="Cancel" onClick={() => navigate(-1)}/>
          </div>
        </form>
      </div>    
    )
}
