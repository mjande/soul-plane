import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import Axios from "axios"
import { PlaneView } from "../../models";

export function Planes() {
  // Initialize plane data into client side
  const [planes, setPlanes] = useState<PlaneView[]>([])

  // Get request to grab all plane data from backend
  useEffect(() => {
    async function getPlanes() {
      const response = await Axios.get(`${import.meta.env.VITE_BACKEND_HOST}/planes`)
      const planesArray = response.data
      planesArray.sort((a: PlaneView, b: PlaneView) => a.plane_id - b.plane_id)

      setPlanes(planesArray)
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
              <th>Plane Type</th>
              <th>Current Airport</th>
            </tr>
          </thead>
          <tbody>
            {planes.map((plane) => (
              <tr key={plane.plane_id}>
                <td>
                  <Link to={`/planes/edit/${plane.plane_id}`}>Edit</Link>
                </td>
                <td>
                  <Link to={`/planes/delete/${plane.plane_id}`}>Delete</Link>
                </td>
                <td>{plane.plane_id}</td>
                <td>{plane.plane_type}</td>
                <td>{plane.current_airport ? plane.current_airport : "NULL"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/planes/new">Add Plane</Link>
        <p>&nbsp;</p>
      </div>
    </div>
  );
}
