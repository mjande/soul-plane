import { useState } from "react"

export default function NewPlaneTypeForm() {
    const [formData, setFormData] = useState({
        type_name: '',
        capacity: 0,
        range_in_hrs: 0,
    })

    async function handleInputChange(event) {
        const { name, value } = event.target
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }))
    }
    
    async function handleSubmit(event) {
        event.preventDefault()
        const postData = new FormData()
        postData.append("type_name", formData.type_name)
        postData.append("capacity", formData.capacity)
        postData.append("range_in_hrs", formData.range_in_hrs)

        console.log(postData)
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
                <input className="btn" type="button" value="Cancel" />
                </div>
            </form>
            </div>    
        </div>
    )
}
