import { FormEvent, ChangeEvent, useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// Initialize Airport properties in FormData
interface FormData {
  airport_id: number;
  airport_name: string;
  airport_code: string;
  location: string;
}

export function UpdateAirports() {
  // Grab airport id from url and initialize airport form data
  const { id } = useParams();
  const [formData, setFormData] = useState<FormData>({
    airport_id: 0,
    airport_name: "",
    airport_code: "",
    location: "",
  });

  useEffect(() => {
    async function getAirports() {
      const response = await Axios.get(
        `${import.meta.env.VITE_BACKEND_HOST}/airports/${id}`);
        const airport = response.data[0]
        setFormData({
            airport_id: airport.airport_id,
            airport_name: airport.airport_name,
            airport_code: airport.airport_code,
            location: airport.location,
        })
    }
    getAirports();
  }, [id]);

  const navigate = useNavigate();


  // Track input changes in form
  async function handleInputChange(
    event: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  // Submit updated airport data into backend 
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await Axios.put(
        `${import.meta.env.VITE_BACKEND_HOST}/airports/${id}`,
        formData
      );
      console.log(response);
      navigate("/airports");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div id="update">
      <form id="updateFlight" method="put" onSubmit={handleSubmit}>
        <legend>
          <strong>Update Airport</strong>
        </legend>
        <fieldset className="fields">
          <span>Airport ID: {id}</span>
          <label>Airport Name</label>
          <input
            type="text"
            name="airport_name"
            value={formData.airport_name}
            onChange={handleInputChange}
            required
          />
          <label>Airport Code</label>
          <input
            type="text"
            name="airport_code"
            value={formData.airport_code}
            onChange={handleInputChange}
            required
          />
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
          />
        </fieldset>
        <div className="buttons-container">
          <input className="btn" type="submit" value="Update Airport" />
          <input
            className="btn"
            type="button"
            value="Cancel"
            onClick={() => navigate(-1)}
          />
        </div>
      </form>
    </div>
  );
}
