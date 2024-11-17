import { FormEvent, useState, useEffect } from "react"
import Axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { PlaneView } from "../../models"

export function DeletePlaneForm() {
    const { id } = useParams() 
    // Initialize plane form into client
    const [plane, setPlane] = useState<PlaneView>({
        plane_id: 0,
        plane_type: "",
        current_airport: ""
    })

    // Grab current plane using planes id
    useEffect(() => {
        async function getPlane() {
            const response = await Axios.get(`${import.meta.env.VITE_BACKEND_HOST}/planes/${id}`)
            const data = response.data[0]

            setPlane({
                plane_id: data.plane_id,
                plane_type: data.plane_type,
                current_airport: data.current_airport,
            })
        }

        getPlane()
    }, [id])

    const navigate = useNavigate()

    // Handle deleting current plane id
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        try {
          const response = await Axios.delete(`${import.meta.env.VITE_BACKEND_HOST}/planes/${id}`)
          console.log(response)
          navigate("/Planes")
        } catch(error) {
            console.log(error)
        }
    }
    
    return (
      <div id="delete">
        <form id="deletePlane" method="post" onSubmit={handleSubmit}>
          <legend>
            <strong>Delete Plane</strong>
          </legend>
          <fieldset className="fields">
            <p>Are you sure you wish to delete the following?</p>
            <span>Plane ID: {plane.plane_id}</span>
            <span>Plane Type: {plane.plane_type}</span>
            <span>Current Airport: {plane.current_airport}</span>
          </fieldset>
          <div className="buttons-container">
            <input className="btn" type="submit" value="Delete Plane" />
            <input className="btn" type="button" value="Cancel" onClick={() => navigate(-1)}/>
          </div>
        </form>
      </div>
    )
}
