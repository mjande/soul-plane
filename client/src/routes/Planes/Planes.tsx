import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import Axios from "axios"

interface Plane {
  plane_id: number,
  type_name: string,
  current_airport: string
}

function Planes() {
  const [planes, setPlanes] = useState<Plane[]>([])

  useEffect(() => {
    async function getPlanes() {
      const response = await Axios.get(`http://${import.meta.env.VITE_HOST_NAME}:55767/planes`)
      const planesArray = response.data
      planesArray.sort((a: Plane, b: Plane) => a.plane_id - b.plane_id)

      setPlanes(response.data)
    }

    getPlanes()
  }, [])
  
  
  
  
  return (
    <div>
      <h1>Planes</h1>
      <div id="browse">
        <p>
          <strong>Browse Planes</strong>
        </p>
        <table>
          <thead>
            <tr>
              <th>New</th>
              <th></th>
              <th>Plane ID</th>
              <th>Current Airport</th>
              <th>Plane Type</th>
            </tr>
          </thead>
          <tbody>
            {planes.map((plane) => (
              <tr key={plane.plane_id}>
                <td>
                  <a href="#">Edit</a>
                </td>
                <td>
                  <a href="#">Delete</a>
                </td>
                <td>{plane.plane_id}</td>
                <td>{plane.type_name}</td>
                <td>{plane.current_airport ? plane.current_airport : "NULL"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/planes/new">Add Plane Type</Link>
        <p>&nbsp;</p>
      </div>

      <div id="update">
        <form id="updatePlane" method="post">
          <legend>
            <strong>Update Plane</strong>
          </legend>
          <fieldset className="fields">
            <span>Plane ID: 1</span>
            <label htmlFor="current_airport_id">Current Airport</label>
            <select name="current_airport_id">
              <option value="1">Portland International Airport</option>
              <option value="2">Seattle-Tacoma International Airport</option>
              <option value="3">Spokane International Airport</option>
              <option value="4">Currently Unavailable</option>
            </select>

            <label htmlFor="plane_type_id">Plane Type</label>
            <select name="plane_type_id">
              <option value="1">Airbus A320-200</option>
              <option value="2">Boeing B737-800</option>
              <option value="3">Embraer 135</option>
            </select>
          </fieldset>
          <div className="buttons-container">
            <input className="btn" type="submit" value="Save Update Plane" />
            <input className="btn" type="button" value="Cancel" />
          </div>
        </form>
      </div>

      <div id="delete">
        <form id="deletePlane" method="post">
          <legend>
            <strong>Delete Plane</strong>
          </legend>
          <fieldset className="fields">
            <p>Are you sure you wish to delete the following?</p>
            <span>Plane ID: 1</span>
            <span>Current Airport: Spokane International Airport</span>
            <span>Plane Type: Airbus A320-200</span>
          </fieldset>
          <div className="buttons-container">
            <input className="btn" type="submit" value="Delete Plane" />
            <input className="btn" type="button" value="Cancel" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Planes;
