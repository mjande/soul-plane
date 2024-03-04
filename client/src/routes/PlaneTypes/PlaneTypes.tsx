import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';

interface PlaneType {
  plane_type_id: number,
  type_name: string,
  capacity: number,
  range_in_hrs: number
}

function PlaneTypes() {
  const [planeTypes, setPlaneTypes] = useState<PlaneType[]>([]);  
  
  // receive data from get request
    useEffect(() => {
      Axios.get(`http://${import.meta.env.VITE_HOST_NAME}:55767/plane-types`).then((response) => {
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
              <tr>
                <td>
                  <Link to={`/PlaneTypes/update/${planeType.plane_type_id}`}>Edit</Link>
                </td>
                <td>
                  <Link to={`/PlaneTypes/delete/${planeType.plane_type_id}`}>Delete</Link>
                </td>
                <td>{planeType.plane_type_id}</td>
                <td>{planeType.type_name}</td>
                <td>{planeType.capacity}</td>
                <td>{planeType.range_in_hrs}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/PlaneTypes/new">Add Plane Type</Link>
        <p>&nbsp;</p>
      </div>
    </div>
  );
}

export default PlaneTypes;
