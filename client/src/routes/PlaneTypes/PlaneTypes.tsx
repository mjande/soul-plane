import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';
import { PlaneType } from "../../models";

export function PlaneTypes() {
  // Initialize plane type data for client
  const [planeTypes, setPlaneTypes] = useState<PlaneType[]>([]);  
  
  // Get request to retrieve all plane type data
    useEffect(() => {
      Axios.get(`${import.meta.env.VITE_BACKEND_HOST}/plane-types`).then((response) => {
        setPlaneTypes(response.data)
      });
  }, []);

  return (
    <div>
      <h1>Plane Types</h1>
      <div id="browse">
        <p>
          <strong>Browse Plane Types</strong>
        </p>
        <table>
          <thead>
            <tr>
              <th colSpan={2}>Actions</th>
              <th>Plane Type ID</th>
              <th>Type Name</th>
              <th>Capacity</th>
              <th>Range (hrs)</th>
            </tr>
          </thead>
          <tbody>
            {planeTypes.map((planeType) => (
              <tr key={planeType.plane_type_id}>
                <td>
                  <Link to={`/plane-types/edit/${planeType.plane_type_id}`}>Edit</Link>
                </td>
                <td>
                  <Link to={`/plane-types/delete/${planeType.plane_type_id}`}>Delete</Link>
                </td>
                <td>{planeType.plane_type_id}</td>
                <td>{planeType.type_name}</td>
                <td>{planeType.capacity}</td>
                <td>{planeType.range_in_hrs}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/plane-types/new">Add Plane Type</Link>
        <p>&nbsp;</p>
      </div>
    </div>
  );
}
