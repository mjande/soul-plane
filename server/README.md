# Soul Plane (Back-end) - Step 4 Draft

This is the back-end for the Soul Plane project. It is a server implemented using Express, and sends data to a React front-end. The server can be accessed directly at `http://flip3.engr.oregonstate.edu/55767`, or queried through the front-end.

# Finding Relevant Files

For Step 4, we implemented CRUD actions for the Airports entity. Each of those endpoints can be found in src/app.ts. 

# Local Setup

Required Dependencies: Node.js (16.50 or higher), MySQL (8.0 or higher)

To run the server locally, first copy the server files into a local directory. Then, you will need to define the tables for the database. Log into your local MySQL instance and load the Data Definition file using `source src/database/ddl.sql`.

Then, you will need to create a .env file with information for your local MySQL database. The .env file should follow this format:

```
DBHOST="localhost"
DBUSER="[your-user-name]"
DBPASSWORD="[your-password]"
DBDATABASE="[your-database-name]"
```

Finally, using the following commands to open the project, install the required dependencies, and run the server:

```
cd server
npm install
npm run dev
```


