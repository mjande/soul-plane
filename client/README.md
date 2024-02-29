# Soul Plane (Front-End) - Step 4 Draft

This is the front-end of our project Soul Plane. It is built using React, and connects to an Express back-end to interact with the database. The front-end can be accessed at `http://flip2.engr.oregonstate.edu:2275/`.

# Finding Relevant Files

Because this app uses React, there are not any traditional HTML files. For those not familiar with React, the TSX files have a similar structure to HTML and should feel familiar to anyone with HTML experience. The main.tsx file (in the client folder) is the entrypoint for the app, but the individual files for each entity can be found in the routes folder. These are roughly the equivalent to the static HTML used in an HTML-only frontend.

For this step, we chose to implement CRUD actions for the Airports entity (which can be found in "routes/Airports.tsx)

# Local Setup

To run the front end locally, first copy the client folder to a local directory. Then, use the commands below to open the project, install the relevant dependencies, and start the front end.

```
  cd client
  npm install
  npm run dev
```

Note: The CRUD actions for Airports will not work if you aren't also running the backend locally. See the set up notes written in server/README.md for more information. You will also need to make some changes to the Airports.tsx file to make local requests. See that file for more details.


