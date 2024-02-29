import { FormEvent, ChangeEvent, useState } from "react"
import Axios from "axios"
import { useNavigate } from "react-router-dom"

interface FormData {
    type_name: string,
    capacity: number,
    range_in_hrs: number
}

export default function NewPlaneTypeForm() {
    const [formData, setFormData] = useState<FormData>({
        type_name: '',
        capacity: 0,   
        range_in_hrs: 0,
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
            const response = await Axios.post("http://localhost:55767/plane-types", formData)
            console.log(response)
            navigate("/PlaneTypes")
        } catch(error) {
            console.log(error)
        }
    }
    
    return (
        <div>
            <h1>Plane Types</h1>
        
            <div id="insert">
            <form id="addPlaneType" method="post" onSubmit={handleSubmit}>
                <legend>
                <strong>Add Plane Type</strong>
                </legend>
                <fieldset className="fields">
                <label>Type Name</label>
                <input type="text" name="type_name" onChange={handleInputChange}/>
                <label>Capacity</label>
                <input type="number" name="capacity" onChange={handleInputChange} />
                <label>Range (hrs)</label>
                <input type="number" name="range_in_hrs" onChange={handleInputChange} />
                </fieldset>
                <div className="buttons-container">
                <input className="btn" type="submit" value="Add Plane Type" />
                <input className="btn" type="button" value="Cancel" onClick={() => navigate(-1)}/>
                </div>
            </form>
            </div>    
        </div>
    )
}
