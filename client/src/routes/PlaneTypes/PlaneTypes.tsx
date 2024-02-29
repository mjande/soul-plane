import { useEffect, useState } from "react";
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
      Axios.get(`http://localhost:55767/plane-types`).then((response) => {
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
              <th><a href="/PlaneTypes/new">New</a></th>
              <th></th>
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
                  <a href={`/PlaneTypes/update/${planeType.plane_type_id}`}>Edit</a>
                </td>
                <td>
                  <a href="#">Delete</a>
                </td>
                <td>{planeType.plane_type_id}</td>
                <td>{planeType.type_name}</td>
                <td>{planeType.capacity}</td>
                <td>{planeType.range_in_hrs}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>&nbsp;</p>
      </div>

      <div id="delete">
        <form id="deletePlaneType" method="post">
          <legend>
            <strong>Delete Plane Type</strong>
          </legend>
          <fieldset className="fields">
            <p>Are you sure you wish to delete the following?</p>
            <span>Plane Type ID: 1</span>
            <span>Type Name: Airbus A320-200</span>
          </fieldset>
          <div className="buttons-container">
            <input className="btn" type="submit" value="Delete Plane Type" />
            <input className="btn" type="button" value="Cancel" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default PlaneTypes;
