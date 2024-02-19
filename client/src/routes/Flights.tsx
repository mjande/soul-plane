
function Flights() {
  return (
    <div>
      <h1>Flights</h1>

      <div id="browse">
        <p>
          <strong>Browse Flights</strong>
        </p>
        <table>
          <thead>
            <tr>
              <th>New</th>
              <th></th>
              <th>Flight ID</th>
              <th>Departure Airport</th>
              <th>Arrival Airport</th>
              <th>Plane</th>
              <th>Departure Time</th>
              <th>Arrival Time</th>
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
              <td>Seattle-Tacoma International Airport</td>
              <td>Plane #3 (Embraer 135)</td>
              <td>February 5, 2024, at 14:30:00</td>
              <td>February 11, 2024, at 02:15:00</td>
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
              <td>Spokane International Airport</td>
              <td>Plane #2 (Boeing B737-800)</td>
              <td>March 12, 2024, at 18:15:00</td>
              <td>April 2, 2024, at 12:30:00</td>
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
              <td>Portland International Airport</td>
              <td>Plane #1 (Airbus A320-200)</td>
              <td>April 20, 2024, at 09:45:00</td>
              <td>May 22, 2024, at 11:15:00</td>
            </tr>
          </tbody>
        </table>
        <p>&nbsp;</p>
      </div>

      <div id="insert">
        <form id="addFlight" method="post">
          <legend>
            <strong>Add Flight</strong>
          </legend>
          <fieldset className="fields">
            <label>Departure Airport</label>
            <select name="depart_airport_id">
              <option value="1">Portland International Airport</option>
              <option value="2">Seattle-Tacoma International</option>
              <option value="3">Spokane International Airport</option>
            </select>
            <label>Arrival Airport</label>
            <select name="arrive_airport_id">
              <option value="1">Portland International Airport</option>
              <option value="2">Seattle-Tacoma International</option>
              <option value="3">Spokane International Airport</option>
            </select>
            <label>Plane</label>
            <select name="plane_id">
              <option value="1">Plane #1 (Airbus A320-200)</option>
              <option value="2">Plane #2 (Boeing B737-800)</option>
              <option value="3">Plane #3 (Embraer 135)</option>
            </select>
            <label>Departure Time</label> <input type="datetime-local" name="depart_time" />
            <label>Arrival Time</label> <input type="datetime-local" name="arrive_time" />
          </fieldset>
          <input className="btn" type="submit" value="Add Flight" />
          <input className="btn" type="button" value="Cancel" />
        </form>
      </div>

      <div id="update">
        <form id="updateFlight" method="post">
          <legend>
            <strong>Update Flight</strong>
          </legend>
          <fieldset className="fields">
            <label>Flight ID:</label> 1
            <label>Departure Airport</label>
            <select name="depart_airport_id">
              <option value="1">Portland International Airport</option>
              <option value="2">Seattle-Tacoma International</option>
              <option value="3">Spokane International Airport</option>
            </select>
            <label>Arrival Airport</label>
            <select name="arrive_airport_id">
              <option value="1">Portland International Airport</option>
              <option value="2">Seattle-Tacoma International</option>
              <option value="3">Spokane International Airport</option>
            </select>
            <label>Plane</label>
            <select name="plane_id">
              <option value="1">Plane #1 (Airbus A320-200)</option>
              <option value="2">Plane #2 (Boeing B737-800)</option>
              <option value="3">Plane #3 (Embraer 135)</option>
            </select>
            <label>Departure Time</label> <input type="datetime-local" value="2024-02-05T14:30" name="depart_time" />
            <label>Arrival Time</label> <input type="datetime-local" value="2024-02-11T02:15" name="arrive_time" />
          </fieldset>
          <input className="btn" type="submit" value="Save Update Flight" />
          <input className="btn" type="button" value="Cancel" />
        </form>
      </div>

      <div id="delete">
        <form id="deleteFlight" method="post">
          <legend>
            <strong>Delete Flight</strong>
          </legend>
          <fieldset className="fields">
            <p>Are you sure you wish to delete the following? </p>
            <label>Flight ID:</label> 1
            <label>Departure Airport:</label> 1
            <label>Arrival Airport:</label> 2
            <label>Plane:</label> Plane #3 (Embraer 135)
            <label>Depart Time:</label> February 5, 2024, at 14:30:00
            <label>Arrival Time:</label> February 11, 2024, at 02:15:00
          </fieldset>
          <input className="btn" type="submit" value="Delete Flight" />
          <input className="btn" type="button" value="Cancel" />
        </form>
      </div>
    </div>
  );
}

export default Flights;
