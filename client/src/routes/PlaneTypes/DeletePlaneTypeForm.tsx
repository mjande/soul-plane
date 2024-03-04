import { FormEvent, useState, useEffect } from "react"
import Axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

interface PlaneType {
    type_name: string,
    capacity: 0,
    range_in_hrs: 0
}

export default function DeletePlaneTypeForm() {
    const { id } = useParams() 

    const [planeType, setPlaneType] = useState<PlaneType>({
        type_name: '',
        capacity: 0,
        range_in_hrs: 0
    })

    useEffect(() => {
        async function getPlaneType() {
            const response = await Axios.get(`http://${import.meta.env.VITE_HOST_NAME}:55767/plane-types/${id}`)
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

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        try {
            const response = await Axios.delete(`http://localhost:55767/plane-types/${id}`)
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
