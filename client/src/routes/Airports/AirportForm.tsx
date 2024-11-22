import { FormEvent, ChangeEvent, useState, useEffect } from "react";
import Axios, { AxiosResponse } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Airport } from "../../models";

export function AirportForm() {
  // Grab airport id from url and initialize airport form data
  const { id } = useParams();
  const [formData, setFormData] = useState<Partial<Airport>>({});

  useEffect(() => {
    async function getAirport() {
      if (id) {
        const response = await Axios.get(
          `${import.meta.env.VITE_BACKEND_HOST}/airports/${id}`);
        const airport = response.data[0];
        setFormData(airport);
      }
    }
    getAirport();
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
      let response: AxiosResponse;
      if (id) {
        response = await Axios.put(
          `${import.meta.env.VITE_BACKEND_HOST}/airports/${id}`, 
          formData
        );
      } else {
        response = await Axios.post(
          `${import.meta.env.VITE_BACKEND_HOST}/airports`,
          formData
        );
      }

      console.log(response);
      navigate("/airports");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <legend>
          <strong>{id ? 'Update Airport' : 'Create Airport'}</strong>
        </legend>

          <fieldset className="fields">
            { id && <span>Airport ID: {id}</span> }

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
          <input className="btn" type="submit" value={id ? "Update Airport" : "Create Airport"} />
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
