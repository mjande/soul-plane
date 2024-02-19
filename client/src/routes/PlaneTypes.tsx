
function PlaneTypes() {
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
              <th>New</th>
              <th></th>
              <th>Plane Type ID</th>
              <th>Type Name</th>
              <th>Capacity</th>
              <th>Range (hrs)</th>
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
              <td>Airbus A320-200</td>
              <td>180</td>
              <td>5</td>
            </tr>
            <tr>
              <td>
                <a href="#">Edit</a>
              </td>
              <td>
                <a href="#">Delete</a>
              </td>
              <td>2</td>
              <td>Boeing B737-800</td>
              <td>190</td>
              <td>5</td>
            </tr>
            <tr>
              <td>
                <a href="#">Edit</a>
              </td>
              <td>
                <a href="#">Delete</a>
              </td>
              <td>3</td>
              <td>Embraer 135</td>
              <td>37</td>
              <td>3</td>
            </tr>
          </tbody>
        </table>
        <p>&nbsp;</p>
      </div>

      <div id="insert">
        <form id="addPlaneType" method="post">
          <legend>
            <strong>Add Plane Type</strong>
          </legend>
          <fieldset className="fields">
            <label>Type Name</label>
            <input type="text" name="type_name" />
            <label>Capacity</label>
            <input type="number" name="capacity" />
            <label>Range (hrs)</label>
            <input type="number" name="range_in_hrs" />
          </fieldset>
          <input className="btn" type="submit" value="Add Plane Type" />
          <input className="btn" type="button" value="Cancel" />
        </form>
      </div>

      <div id="update">
        <form id="updatePlaneType" method="post">
          <legend>
            <strong>Update Plane Type</strong>
          </legend>
          <fieldset className="fields">
            <label>Plane Type ID:</label> 1
            <label>Type Name</label>
            <input type="text" value="Airbus A320-200" name="type_name" />
            <label>Capacity</label>
            <input type="number" name="capacity" value="180" />
            <label>Range (hrs)</label>
            <input type="number" name="range_in_hrs" value="5" />
          </fieldset>
          <input className="btn" type="submit" value="Save Update Plane Type" />
          <input className="btn" type="button" value="Cancel" />
        </form>
      </div>

      <div id="delete">
        <form id="deletePlaneType" method="post">
          <legend>
            <strong>Delete Plane Type</strong>
          </legend>
          <fieldset className="fields">
            <p>Are you sure you wish to delete the following?</p>
            <label>Plane Type ID:</label> 1
            <label>Type Name:</label> Airbus A320-200
          </fieldset>
          <input className="btn" type="submit" value="Delete Plane Type" />
          <input className="btn" type="button" value="Cancel" />
        </form>
      </div>
    </div>
  );
}

export default PlaneTypes;
