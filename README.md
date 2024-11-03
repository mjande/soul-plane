# Soul Plane

This application is an airline fleet management tool developed as part of the Introduction to Databases course at Oregon State University. It is designed to fulfill the needs of a small regional airline that has a fleet of under 50 planes and sells tickets for ~30 direct flights each week. This fictional airline serves around 500 customers a week and has an annual revenue of roughly $15 million. The database for this airline stores data for its flights each week, and each flight goes from one airport to another using a particular plane in the fleet and containing a certain number of passengers. The airline uses this database to maintain data about their current fleet and record flights as transactions involving a plane flying from one airport to another with a number of associated passengers.

## Usage

This application is currently hosted on Railway and can be viewed at [client-production-e858.up.railway.app](client-production-e858.up.railway.app). The home page contains links to each of the entities in the database, where a user can create, read, update, or delete any entity record. 

## Local Installation

If you wish to work with a local version of the application, you must first have these dependencies installed:
- MySQL (with a MySQL server running on your local system)
- Node.js
- Node Package Manager (npm)

Start by cloning the project into a local directory using `git clone git@github.com:mjande/soul-plane.git`. Before starting up the application, you will need to define and populate a local database on your local MySQL server:

```.sh
cd soul-plane/server/src/database
mysql -u [local-database-username] -p [local-database-name]
source ddl.sql
source seed.sql # Run if you want the database to contain some initial data
```

If executed correctly, you should see data for each of the entities displayed in your terminal. Exit out of MySQL in your terminal. 

Next, you will need to add your database credentials to the db-connector.ts file in the `server/databases` directory so that the application's backend can connect to your local database. In that file, fill the fields for hostname, user, password, database, and port with the information for your local database. Alternatively, you may store these credentials in your environment using a .env file.

You are now ready to start up the application's backend. Navigate back to the `server` directory and execute the following commands:

```.sh
npm install
npm run dev
```

You can test that the backend is running correctly by running a sample query to the backend URL, such as `localhost:3000/Airports`. That request should return the any airports loaded into the database.

To start the application's frontend, you will first need to create a .env file that contains the URI of the backend service. When locally you will usually want something like this: `VITE_BACKEND_HOST=http://localhost:3000`, though the address and/or port number may vary.

Finally, navigate to the `client` folder and execute these commands:

```.sh
npm install
npm run dev
```

The application should now be running.
