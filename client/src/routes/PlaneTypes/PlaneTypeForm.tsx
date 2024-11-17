import { FormEvent, ChangeEvent, useState, useEffect } from "react"
import Axios, { AxiosResponse } from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { PlaneType } from "../../models";

export function PlaneTypeForm() {
    // Initialize plane type form data
    const { id } = useParams();
    const [formData, setFormData] = useState<Partial<PlaneType>>({});

    useEffect(() => {
        async function getPlaneType() {
            if (id) {
                const response = await Axios.get(`${import.meta.env.VITE_BACKEND_HOST}/plane-types/${id}`)
                const data = response.data[0]

                setFormData({
                    type_name: data.type_name,
                    capacity: data.capacity,
                    range_in_hrs: data.range_in_hrs
                })
            }
        }
        getPlaneType()
    }, [id])

    const navigate = useNavigate();

    // Handle input change for plane type form
    async function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }))
    }

    // Handle updating plane type form using put request for current plane type
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        try {
            let response: AxiosResponse;
            if (id) {
                response = await Axios.put(`${import.meta.env.VITE_BACKEND_HOST}/plane-types/${id}`, formData)
            } else {
                response = await Axios.post(`${import.meta.env.VITE_BACKEND_HOST}/plane-types`, formData)
            }

            console.log(response);
            navigate("/plane-types")
        } catch(error) {
            console.log(error)
        }
    }
    
    return (
        <div>
            <h1>Plane Types</h1>
        
            <div id="update">
            <form id="updatePlaneType" onSubmit={handleSubmit}>
                <legend>
                <strong>{ id ? 'Update Plane Type' : 'Create Plane Type' }</strong>
                </legend>

                <fieldset className="fields">
                { id && <span>Plane Type ID: {id}</span> }

                <label>Type Name</label>
                <input type="text" name="type_name" value={formData.type_name} onChange={handleInputChange} required/>
                <label>Capacity</label>
                <input type="number" name="capacity" value={formData.capacity} onChange={handleInputChange} required />
                <label>Range (hrs)</label>
                <input type="number" name="range_in_hrs" value={formData.range_in_hrs} onChange={handleInputChange} required />
                </fieldset>
                <div className="buttons-container">
                <input className="btn" type="submit" value={ id ? "Update Plane Type" : "Create Plane Type" }/>
                <input className="btn" type="button" value="Cancel" onClick={() => navigate(-1)}/>
                </div>
            </form>
            </div>    
        </div>
    )
}
