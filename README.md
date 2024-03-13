# Soul Plane

Documentation for front-end and back-end can be found in the README.md files in the client and server subdirectories. Read through the files for more information about accessing the front- and back-end.

## Citations
- Within our backend we used [the starter app/code](https://github.com/osu-cs340-ecampus/nodejs-starter-app) provided on eCampus to get a foundation on getting started with our node.js backend. We also used [mySQL](https://sidorares.github.io/node-mysql2/docs) docs to get our code to interact with the database, [CORS request](https://www.twilio.com/en-us/blog/add-cors-support-express-typescript-api), and used the [express docs](https://expressjs.com/en/guide/routing.html) for the rest of our needs in the creation and usage of routers. We also used the resources found at [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/tel) for form validation.

## TODO
- Fix feedback received from Draft 5 Ed post
- Condense changes to 1 page executive summary
- Capture screenshots of each of the UI pages on the website (especially noting delete from M:N, NULLable relationship, and M:N update)
- Polish root README
- Polish front end README 
- Polish back end README
- Double check phone number formatting in forms is okay

### Completed
- Write citations where needed (and highligh original work where appropriate)
- Add clarifying comments to HTML and JS files
- Make sure queries in backend match queries in DML.sql
- Make sure DDL.sql is cleanly importable
- Add citation note about starter code to README

## Suggestions from Ed\
- Edit styles for passengers so form is a single column
- Restrict NULL fields for Plane Types
- Restrict NULL fields for PassengerFlights
- Add default values for Create Flight
- Add default values for Create Plane
- "When deleting a passenger, the data on the confirmation screen overflows outside of the border. (I am using Mozilla Firefox on Windows 10)" - I can't reproduce this so maybe don't worry about it?
- Delete seems to not be working for Plane Types?

### Completed Suggestions
- Restrict NULL fields for Airports
- Validate phone number and state in passengers and add placeholders
- Restrict NULL fields for Passengers

