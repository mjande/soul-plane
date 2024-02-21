
function Planes() {
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
            <tr>
              <td>
                <a href="#">Edit</a>
              </td>
              <td>
                <a href="#">Delete</a>
              </td>
              <td>1</td>
              <td>Spokane International Airport</td>
              <td>Airbus A320-200</td>
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
              <td>Boeing B737-800</td>
            </tr>
            <tr>
              <td>
                <a href="#">Edit</a>
              </td>
              <td>
                <a href="#">Delete</a>
              </td>
              <td>3</td>
              <td>Portland International Airport</td>
              <td>Embraer 135</td>
            </tr>
          </tbody>
        </table>
        <p>&nbsp;</p>
      </div>

      <div id="insert">
        <form id="addPlane" method="post">
          <legend>
            <strong>Add Plane</strong>
          </legend>
          <fieldset className="fields">
            <label>Current Airport</label>
            <select name="current_airport_id">
              <option value="1">Portland International Airport</option>
              <option value="2">Seattle-Tacoma International Airport</option>
              <option value="3">Spokane International Airport</option>
              <option value="4">Currently Unavailable</option>
            </select>
            <label>Plane Type</label>
            <select name="plane_type_id">
              <option value="1">Airbus A320-200</option>
              <option value="2">Boeing B737-800</option>
              <option value="3">Embraer 135</option>
            </select>
          </fieldset>
          <input className="btn" type="submit" value="Add Plane" />
          <input className="btn" type="button" value="Cancel" />
        </form>
      </div>

      <div id="update">
        <form id="updatePlane" method="post">
          <legend>
            <strong>Update Plane</strong>
          </legend>
          <fieldset className="fields">
            <label>Plane ID:</label> 1
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
          <input className="btn" type="submit" value="Save Update Plane" />
          <input className="btn" type="button" value="Cancel" />
        </form>
      </div>

      <div id="delete">
        <form id="deletePlane" method="post">
          <legend>
            <strong>Delete Plane</strong>
          </legend>
          <fieldset className="fields">
            <p>Are you sure you wish to delete the following?</p>
            <label>Plane ID:</label> 1
            <label>Current Airport:</label> Spokane International Airport
            <label>Plane Type:</label> Airbus A320-200
          </fieldset>
          <input className="btn" type="submit" value="Delete Plane" />
          <input className="btn" type="button" value="Cancel" />
        </form>
      </div>
    </div>
  );
}

export default Planes;
