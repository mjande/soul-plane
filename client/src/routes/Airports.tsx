import { FormEvent, ChangeEvent, useEffect, useState } from "react";
import Axios from 'axios';

interface FormData {
  airport_name: string;
  airport_code: string;
  location: string;
}

interface Airport {
  airport_id: number;
  airport_name: string;
  airport_code: string;
  location: string;
}

function Airports() {
  const [airports, setAirports] = useState<Airport[]>([]);
  const [selectedAirportId, setSelectedAirportId] = useState<string | undefined>("");
  const [selectedAirportIdDelete, setSelectedAirportIdDelete] = useState<string | undefined>("");

  // receive data from get request
  useEffect(() => {
    Axios.get(`http://${import.meta.env.VITE_HOST_NAME}:55767/Airports`).then((response) => {
      setAirports(response.data);
    });
  }, [airports]);


  const [insertFormData, setInsertFormData] = useState<FormData>({
    airport_name: "",
    airport_code: "",
    location: "",
  });

  const [updateFormData, setUpdateFormData] = useState<FormData>({
    airport_name: "",
    airport_code: "",
    location: "",
  });

  const [deleteFormData, setDeleteFormData] = useState<FormData>({
    airport_name: "",
    airport_code: "",
    location: "",
  });

  const handleInsertInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInsertFormData((prevData: FormData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdateInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUpdateFormData((prevData: FormData) => ({ ...prevData, [name]: value }));
  };

  // Insert new Airport
  const handleAddAirport = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try { 
      const response = await Axios.post(`http://${import.meta.env.VITE_HOST_NAME}:55767/Airports`, insertFormData);
      console.log({ data: response.data });
    } catch (error) {
      console.error(error);
    }
  };

  const handleAirportSelection = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    setSelectedAirportId(selectedOption);
    const selectedAirport = airports.find((airport) => airport.airport_id === Number(selectedOption));

    setUpdateFormData({
      ...updateFormData,
      airport_name: selectedAirport?.airport_name || "",
    });
  };

  const handleAirportSelectionDelete = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    setSelectedAirportIdDelete(selectedOption);
    const selectedAirport = airports.find((airport) => airport.airport_id === Number(selectedOption));

    setDeleteFormData({
      ...deleteFormData,
      airport_name: selectedAirport?.airport_name || "",
      airport_code: selectedAirport?.airport_code || "",
      location: selectedAirport?.location || "",
    });
  };

  // Update Airport
  const handleUpdateAirport = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!selectedAirportId) {
        console.error("No airport selected for update.");
        return;
      }
      const response = await Axios.put(`http://${import.meta.env.VITE_HOST_NAME}:55767/Airports/${selectedAirportId}`, updateFormData);
      console.log({ data: response.data });
      
      const updatedAirports = await Axios.get(`http://${import.meta.env.VITE_HOST_NAME}:55767/Airports`);
      setAirports(updatedAirports.data);

      setUpdateFormData({
        airport_name: "",
        airport_code: "",
        location: "",
      });
      setSelectedAirportId("");
    } catch (error) {
      console.error(error);
    }
  };

  // Delete Airport
  const handleDeleteAirport = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!selectedAirportIdDelete) {
        console.error("No airport selected for deletion.");
        return;
      }
      const response = await Axios.delete(`http://${import.meta.env.VITE_HOST_NAME}:55767/Airports/${selectedAirportIdDelete}`);
      console.log({ data: response.data });

      const updatedAirports = await Axios.get(`http://${import.meta.env.VITE_HOST_NAME}:55767/Airports`);
      setAirports(updatedAirports.data);

      setUpdateFormData({
        airport_name: "",
        airport_code: "",
        location: "",
      });
      setSelectedAirportIdDelete("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteAirportById = async (airportId: number) => {
    try {
      const response = await Axios.delete(`http://${import.meta.env.VITE_HOST_NAME}:55767/Airports/${airportId}`);
      console.log({ data: response.data });

      const updatedAirports = await Axios.get(`http://${import.meta.env.VITE_HOST_NAME}:55767/Airports`);
      setAirports(updatedAirports.data);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div>
      <h1>Airports</h1>
      <div>
        <p>
          <strong>Browse Airports</strong>
        </p>
        <table>
          <thead>
            <tr>
              <th>New</th>
              <th></th>
              <th>Airport ID</th>
              <th>Airport Name</th>
              <th>Airport Code</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {airports.map((airport) => (
              <tr key={airport.airport_code}>
                <td>
                  <a onClick={() => handleAirportSelection({ target: { value: airport.airport_id.toString() } } as ChangeEvent<HTMLSelectElement>)}>Edit</a>
                </td>
                <td>
                  <a onClick={() => handleDeleteAirportById(airport.airport_id)}>Delete</a>
                </td>
                <td>{airport.airport_id}</td>
                <td>{airport.airport_name}</td>
                <td>{airport.airport_code}</td>
                <td>{airport.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>&nbsp;</p>
      </div>

      <div id="insert">
      <form id="addAirport" onSubmit={handleAddAirport} method="post">
          <legend>
            <strong>Add Airport</strong>
          </legend>
        <fieldset className="fields">
          <label>Airport Name</label> <input type="text" name="airport_name" value={insertFormData.airport_name} onChange={handleInsertInputChange} className="long-text-input" />
          <label>Airport Code</label> <input type="text" name="airport_code" value={insertFormData.airport_code} onChange={handleInsertInputChange} className="short-text-input" maxLength={3}/>
          <label>Location</label> <input type="text" name="location" value={insertFormData.location} onChange={handleInsertInputChange} />
        </fieldset>
        <div className="buttons-container">
          <input className="btn" type="submit" value="Add Airport" />
          <input className="btn" type="button" value="Cancel" />
        </div>
      </form>
    </div>

      <div id="update">
        <form id="updateAirport" onSubmit={handleUpdateAirport} method="post">
          <legend>
            <strong>Update Airport</strong>
          </legend>
          <fieldset className="fields">
              <select name="airport_name" onChange={handleAirportSelection} className="dropdown-input" value={selectedAirportId}>
              <option value="">Select an airport</option>
              {airports.map((airport) => (
                <option key={airport.airport_id} value={airport.airport_id}>
                  {airport.airport_name}
                </option>
              ))}
              </select>
            <label>Airport Code</label> <input type="text" name="airport_code" value={updateFormData.airport_code} className="short-text-input" onChange={handleUpdateInputChange} maxLength={3}/>
            <label>Location</label> <input type="text" name="location" value={updateFormData.location} onChange={handleUpdateInputChange}/>
          </fieldset>
          <div className="buttons-container">
            <input className="btn" type="submit" value="Save Update Airport" />
            <input className="btn" type="button" value="Cancel" />
          </div>
        </form>
      </div>

      <div id="delete">
      <form id="deleteAirport" onSubmit={handleDeleteAirport} method="post">
        <legend>
          <strong>Delete Airport</strong>
        </legend>
        <fieldset className="fields">
          <select
            name="delete_airport_name"
            onChange={handleAirportSelectionDelete}
            className="dropdown-input"
            value={selectedAirportIdDelete}
          >
            <option value="">Select an airport</option>
            {airports.map((airport) => (
              <option key={airport.airport_id} value={airport.airport_id}>
                {airport.airport_name}
              </option>
            ))}
          </select>
          <label>Airport Code</label>
          <input type="text" name="airport_code" value={deleteFormData.airport_code} readOnly />
          
          <label>Location</label>
          <input type="text" name="location" value={deleteFormData.location} readOnly />
        </fieldset>
        <div className="buttons-container">
          <input className="btn" type="submit" value="Delete Airport" />
          <input className="btn" type="button" value="Cancel" />
        </div>
      </form>
    </div>
  </div>
  );
}

export default Airports;
