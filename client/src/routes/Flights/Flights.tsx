import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

interface Flight {
  flight_id: number,
  plane_id: number, 
  plane_type: string,
  depart_airport_id: number, 
  depart_airport_name: string,
  arrive_airport_id: number,
  arrive_airport_name: string,
  depart_time: Date,
  arrive_time: Date
}

interface Plane {
  plane_id: number,
  plane_type: string,
  current_airport: string
}

function Flights() {
  const [flights, setFlights] = useState<Flight[]>([])
  const [planes, setPlanes] = useState<Planes{}>({})

  useEffect(() => {
    async function getFlights() {
      const response = await Axios.get(`http://${import.meta.env.VITE_HOST_NAME}:55767/flights`)
      const flightsArray = response.data
      flightsArray.sort((a: Flight, b: Flight) => a.flight_id - b.flight_id)

      setFlights(flightsArray)
    }

    async function getPlanes() {
      const response = await Axios.get(`http://${import.meta.env.VITE_HOST_NAME}:557676/planes`)
    }
  })


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
          <div className="buttons-container">
            <input className="btn" type="submit" value="Add Flight" />
            <input className="btn" type="button" value="Cancel" />
          </div>
        </form>
      </div>

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

      <div id="delete">
        <form id="deleteFlight" method="post">
          <legend>
            <strong>Delete Flight</strong>
          </legend>
          <fieldset className="fields">
            <span>Are you sure you wish to delete the following? </span>
            <span>Flight ID: 1</span>
            <span>Departure Airport: Portland International Airport</span>
            <span>Arrival Airport: Seattle-Tacoma International Airport</span>
            <span>Plane: Plane #3 (Embraer 135)</span>
            <span>Depart Time: February 5, 2024, at 14:30:00 </span>
            <span>Arrival Time: February 11, 2024, at 02:15:00</span>
          </fieldset>
          <div className="buttons-container">
            <input className="btn" type="submit" value="Delete Flight" />
            <input className="btn" type="button" value="Cancel" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Flights;
