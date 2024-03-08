export function UpdateFlightForm() {
    return (
        <div id="update">
        <form id="updateFlight" method="post">
          <legend>
            <strong>Update Flight</strong>
          </legend>
          <fieldset className="fields">
            <span>Flight ID: 1</span>
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
          <div className="buttons-container">
            <input className="btn" type="submit" value="Save Update Flight" />
            <input className="btn" type="button" value="Cancel" />
          </div>
        </form>
      </div>    
    )
}
