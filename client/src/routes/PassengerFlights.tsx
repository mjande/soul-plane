
function PassengerFlights() {
  return (
    <div>
      <h1>Passenger_Flights</h1>
      <div id="browse" >
        <p>
          <strong>Browse Passenger_Flights</strong>
        </p>
        <table>
          <thead>
            <tr>
              <th>New</th>
              <th></th>
              <th>Flight</th>
              <th>Passenger</th>
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
              <td>Spokane International Airport &#8594; Seattle-Tacoma International Airport</td>
              <td>Matt Anderson</td>
            </tr>
            <tr>
              <td>
                <a href="#">Edit</a>
              </td>
              <td>
                <a href="#">Delete</a>
              </td>
              <td>Seattle-Tacoma International Airport &#8594; Spokane International Airport</td>
              <td>Paul Nguyen</td>
            </tr>
            <tr>
              <td>
                <a href="#">Edit</a>
              </td>
              <td>
                <a href="#">Delete</a>
              </td>
              <td>Portland International Airport &#8594; Seattle-Tacoma International Airport</td>
              <td>Steve Rogers</td>
            </tr>
          </tbody>
        </table>
        <p>&nbsp;</p>
      </div>

      <div id="insert">
        <form id="addPassengerFlight" method="post">
          <legend>
            <strong>Add Passenger_Flight</strong>
          </legend>
          <fieldset className="fields">
            <label htmlFor="flight_id">Flight</label>
            <select name="flight_id" id="flight_id">
              <option value="1">Portland International Airport &#8594; Seattle-Tacoma International Airport</option>
              <option value="2">Seattle-Tacoma International &#8594; Spokane International Airport</option>
              <option value="3">Spokane International Airport &#8594; Seattle-Tacoma International Airport</option>
            </select>
            <label htmlFor="passenger_id">Passenger</label>
            <select name="passenger_id" id="passenger_id">
              <option value="1">Paul Nguyen</option>
              <option value="2">Matt Anderson</option>
              <option value="3">Steve Rogers</option>
            </select>
          </fieldset>
          <div className="buttons-container">
            <input className="btn" type="submit" value="Add Passenger_Flight" />
            <input className="btn" type="button" value="Cancel" />
          </div>
        </form>
      </div>

      <div id="update">
        <form id="updatePassengerFlight" method="post">
          <legend>
            <strong>Update Passenger_Flight</strong>
          </legend>
          <fieldset className="fields">
            <label htmlFor="flight_id">Flight</label>
            <select name="flight_id" id="flight_id">
              <option value="1">Portland International Airport &#8594; Seattle-Tacoma International Airport</option>
              <option value="2">Seattle-Tacoma International &#8594; Spokane International Airport</option>
              <option value="3">Spokane International Airport &#8594; Seattle-Tacoma International Airport</option>
            </select>
            <label htmlFor="passenger_id">Passenger</label>
            <select name="passenger_id" id="passenger_id">
              <option value="1">Paul Nguyen</option>
              <option value="2">Matt Anderson</option>
              <option value="3">Steve Rogers</option>
            </select>
          </fieldset>
          <div className="buttons-container">
            <input className="btn" type="submit" value="Save Update Passenger_Flight" />
            <input className="btn" type="button" value="Cancel" />
          </div>
        </form>
      </div>

      <div id="delete">
        <form id="deletePassengerFlight" method="post">
          <legend>
            <strong>Delete Passenger_Flight</strong>
          </legend>
          <fieldset className="fields">
            <p>Are you sure you wish to delete the following?</p>
            <span>Flight: Spokane International Airport</span>
            <span>Passenger: Matt Anderson</span>
          </fieldset>
          <div className="buttons-container">
            <input className="btn" type="submit" value="Delete Passenger_Flight" />
            <input className="btn" type="button" value="Cancel" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default PassengerFlights;
