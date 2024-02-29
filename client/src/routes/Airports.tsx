import { FormEvent, ChangeEvent, useEffect, useState } from "react";
import Axios from 'axios';

interface FormData {
  airport_name: string;
  airport_code: string;
  location: string;
}

function Airports() {
   // receive data from get request
   useEffect(() => {
    Axios.get('http://flip3.engr.oregonstate.edu:55767/Airports').then((response) => {
      console.log({ data: response.data })
    });
  }, []);


  // set up data for post request
  const [formData, setFormData] = useState<FormData>({
    airport_name: "",
    airport_code: "",
    location: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: FormData) => ({ ...prevData, [name]: value }));
  };

  // Insert new Airport
  const handleAddAirport = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await Axios.post('http://flip3.engr.oregonstate.edu:55767/Airports', formData);
      console.log({ data: response.data });
    } catch (error) {
      console.error(error);
    }
  };

  // Update Airport

  // Delete Airport

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
            <tr>
              <td>
                <a href="#">Edit</a>
              </td>
              <td>
                <a href="#">Delete</a>
              </td>
              <td>1</td>
              <td>Portland International Airport</td>
              <td>PDX</td>
              <td>Portland, OR</td>
            </tr>
            <tr>
              <td>
                <a href="#">Edit</a>
              </td>
              <td>
                <a href="#">Delete</a>
              </td>
              <td>2</td>
              <td>Seattle-Tacoma International Airport</td>
              <td>SEA</td>
              <td>SeaTac, WA</td>
            </tr>
            <tr>
              <td>
                <a href="#">Edit</a>
              </td>
              <td>
                <a href="#">Delete</a>
              </td>
              <td>3</td>
              <td>Spokane International Airport</td>
              <td>GEG</td>
              <td>Spokane, WA</td>
            </tr>
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
          <label>Airport Name</label> <input type="text" name="airport_name" value={formData.airport_name} onChange={handleInputChange} className="long-text-input" />
          <label>Airport Code</label> <input type="text" name="airport_code" value={formData.airport_code} onChange={handleInputChange} className="short-text-input"/>
          <label>Location</label> <input type="text" name="location" value={formData.location} onChange={handleInputChange} />
        </fieldset>
        <div className="buttons-container">
          <input className="btn" type="submit" value="Add Airport" />
          <input className="btn" type="button" value="Cancel" />
        </div>
      </form>
    </div>

      <div id="update">
        <form id="updateAirport" method="post">
          <legend>
            <strong>Update Airport</strong>
          </legend>
          <fieldset className="fields">
            <p>Airport ID: 1</p>
            <label>Airport Name</label> <input type="text" value="Portland International Airport" name="airport_name" className="long-text-input"/>
            <label>Airport Code</label> <input type="text" name="airport_code" value="PDX" className="short-text-input" />
            <label>Location</label> <input type="text" name="location" value="Portland, OR" />
          </fieldset>
          <div className="buttons-container">
            <input className="btn" type="submit" value="Save Update Airport" />
            <input className="btn" type="button" value="Cancel" />
          </div>
        </form>
      </div>

      <div id="delete">
        <form id="deleteAirport" method="post">
          <legend>
            <strong>Delete Airport</strong>
          </legend>
          <fieldset className="fields">
            <p>Are you sure you wish to delete the following?</p>
            <p>Airport ID: 1</p>
            <p>Airport Name: Portland International Airport</p>
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
