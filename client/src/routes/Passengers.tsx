
function Passengers() {
  return (
    <div>
      <h1>Passengers</h1>
      <div id="browse">
        <p>
          <strong>Browse Passengers</strong>
        </p>
        <table>
          <thead>
            <tr>
              <th>New</th>
              <th></th>
              <th>Passenger ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>Zip Code</th>
              <th>Passport Number</th>
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
              <td>Paul</td>
              <td>Nguyen</td>
              <td>111-222-3333</td>
              <td>paul@oregonstate.edu</td>
              <td>1111 Oregon St</td>
              <td>Corvallis</td>
              <td>OR</td>
              <td>97330</td>
              <td>A11222333</td>
            </tr>
            <tr>
              <td>
                <a href="#">Edit</a>
              </td>
              <td>
                <a href="#">Delete</a>
              </td>
              <td>2</td>
              <td>Matt</td>
              <td>Anderson</td>
              <td>222-333-4444</td>
              <td>matt@oregonstate.edu</td>
              <td>2222 Washington St</td>
              <td>Spokane</td>
              <td>WA</td>
              <td>99201</td>
              <td>B22333444</td>
            </tr>
            <tr>
              <td>
                <a href="#">Edit</a>
              </td>
              <td>
                <a href="#">Delete</a>
              </td>
              <td>3</td>
              <td>Steve</td>
              <td>Rogers</td>
              <td>832-424-8060</td>
              <td>steve@marvel.com</td>
              <td>14520 Walt St</td>
              <td>Orlando</td>
              <td>FL</td>
              <td>32789</td>
              <td>C334445555</td>
            </tr>
          </tbody>
        </table>
        <p>&nbsp;</p>
      </div>

      <div id="insert">
        <form id="addPassenger" method="post">
          <legend>
            <strong>Add Passenger</strong>
          </legend>
          <fieldset className="fields">
            <label>First Name</label>
            <input type="text" name="first_name" />
            <label>Last Name</label>
            <input type="text" name="last_name" />
            <label>Phone</label>
            <input type="tel" name="phone" />
            <label>Email</label>
            <input type="email" name="email" />
            <label>Address</label>
            <input type="text" name="address" />
            <label>City</label>
            <input type="text" name="city" />
            <label>State</label>
            <input type="text" name="state" />
            <label>Zip Code</label>
            <input type="number" name="zip_code" />
            <label>Passport Number</label>
            <input type="text" name="passport_number" />
          </fieldset>
          <div className="buttons-container">
            <input className="btn" type="submit" value="Add Passenger" />
            <input className="btn" type="button" value="Cancel" />
          </div>
        </form>
      </div>

      <div id="update">
        <form id="updatePassenger" method="post">
          <legend>
            <strong>Update Passenger</strong>
          </legend>
          <fieldset className="fields">
            <span>Passenger ID: 1</span>
            <label>First Name</label>
            <input type="text" value="Paul" name="first_name" />
            <label>Last Name</label>
            <input type="text" value="Nguyen" name="last_name" />
            <label>Phone</label>
            <input type="tel" value="111-222-3333" name="phone" />
            <label>Email</label>
            <input type="email" value="paul@oregonstate.edu" name="email" />
            <label>Address</label>
            <input type="text" value="1111 Oregon St" name="address" />
            <label>City</label>
            <input type="text" value="Corvallis" name="city" />
            <label>State</label>
            <input type="text" value="OR" name="state" />
            <label>Zip Code</label>
            <input type="number" value="97330" name="zip_code" />
            <label>Passport Number</label>
            <input type="text" value="A11222333" name="passport_number" />
          </fieldset>
          <div className="buttons-container">
            <input className="btn" type="submit" value="Save Update Passenger" />
            <input className="btn" type="button" value="Cancel" />
          </div>
        </form>
      </div>

      <div id="delete">
        <form id="deletePassenger" method="post">
          <legend>
            <strong>Delete Passenger</strong>
          </legend>
          <fieldset className="fields">
            <p>Are you sure you wish to delete the following?</p>
            <span>Passenger ID: 1</span>
            <span>First Name: Paul</span>
            <span>Last Name: Nguyen</span>
            <span>Phone: 111-222-3333</span>
            <span>Email: paul@oregonstate.edu</span>
          </fieldset>
          <div className="buttons-container">
            <input className="btn" type="submit" value="Delete Passenger" />
            <input className="btn" type="button" value="Cancel" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Passengers;
