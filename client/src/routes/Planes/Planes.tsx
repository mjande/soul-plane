import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import Axios from "axios"


// Define Plane property
interface Plane {
  plane_id: number,
  plane_type: string,
  current_airport: string
}

function Planes() {
  // Initialize plane data into client side
  const [planes, setPlanes] = useState<Plane[]>([])

  // Get request to grab all plane data from backend
  useEffect(() => {
    async function getPlanes() {
      const response = await Axios.get(`http://${import.meta.env.VITE_HOST_NAME}:55767/planes`)
      const planesArray = response.data
      planesArray.sort((a: Plane, b: Plane) => a.plane_id - b.plane_id)

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
                  <Link to={`/planes/update/${plane.plane_id}`}>Edit</Link>
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
        <Link to="/planes/new">Add Plane Type</Link>
        <p>&nbsp;</p>
      </div>
    </div>
  );
}

export default Planes;
