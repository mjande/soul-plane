# Soul Plane

This application is an airline fleet management tool developed as part of the Introduction to Databases course at Oregon State University. It is designed to fulfill the needs of a small regional airline that has a fleet of under 50 planes and sells tickets for ~30 direct flights each week. This fictional airline serves around 500 customers a week and has an annual revenue of roughly $15 million. The database for this airline stores data for its flights each week, and each flight goes from one airport to another using a particular plane in the fleet and containing a certain number of passengers. The airline uses this database to maintain data about their current fleet and record flights as transactions involving a plane flying from one airport to another with a number of associated passengers.

## Citations
Within our backend we used [the starter app/code](https://github.com/osu-cs340-ecampus/nodejs-starter-app) provided on Canvas to get a foundation on getting started with our node.js backend. We also used the [mySQL2](https://sidorares.github.io/node-mysql2/docs) docs to get our code to interact with the database, a [Twilio blog post](https://www.twilio.com/en-us/blog/add-cors-support-express-typescript-api) for fixing issues related to Cross-Origin requests, and the [Express docs](https://expressjs.com/en/guide/routing.html) for the rest of our needs in the creation and usage of routers. 

A few small changes to the frontend were also adapted from the following sources: [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/tel) for form validation, [React Router](https://reactrouter.com/en/main) for setting up the page routes, [Axios](https://axios-http.com/docs/intro) for interacting with the server, and [StackOverflow](https://stackoverflow.com/questions/69264472/axios-error-typescript-annotation-must-be-any-or-unknown-if) and [TypeScript docs](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates) for type checking. With the exception of the previous sources, all the React pages were entirely our own work.

### Citation Links
- Node.js Starter App: https://github.com/osu-cs340-ecampus/nodejs-starter-app
- MySQL docs: https://sidorares.github.io/node-mysql2/docs
- Twilio blog post: https://www.twilio.com/en-us/blog/add-cors-support-express-typescript-api
- Express docs: https://expressjs.com/en/guide/routing.html
- MDN Web docs: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/tel
- Stack Overflow post: https://stackoverflow.com/questions/69264472/axios-error-typescript-annotation-must-be-any-or-unknown-if
- TypeScript docs: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
- React Router https://reactrouter.com/en/main
- Axios https://axios-http.com/docs/intro

## Usage

To use the application, you must use a VPN to connect to OSU's flip servers. To access the front end (UI) of the application, connect to the Flip 3 server and navigate to `http://flip3.engr.oregonstate.edu:2275`. The home page contains links to each of the entities in the database, where a user can create, read, update, or delete any entity record. 

## Local Installation

If you wish to work with a local version of the application, you must first have these dependencies installed:
- MySQL (with a MySQL server running on your local system)
- Node.js
- Node Package Manager (npm)

Start by cloning the project into a local directory using `git clone git@github.com:paul-nguyen-1/soul-plane.git`. Before starting up the application, you will need to define and populate a local database on your local MySQL server:

```.sh
cd soul-plane/server/src/database
mysql -u [local-database-username] -p [local-database-name]
source ddl.sql
```

You will be prompted to enter your database password before running the DDL file. If executed correctly, you should see data for each of the entities displayed in your terminal. Exit out of MySQL in your terminal. 

Next, you will need to add your database credentials to the db-connector.ts file in the `server/databases` directory so that the application's backend can connect to your local database. In that file, fill the fields for hostname, user, password, and database with the information for your local database.

You are now ready to start up the application's backend. Navigate back to the `server` directory and execute the following commands:

```.sh
npm install
npm run dev
```

You can test that the backend is running correctly by running a sample query to the backend URL, such as `localhost:55767/Airports`. That request should return the three airports just loaded into the database.

Finally, to start the application's frontend, navigate to the `client` folder and execute these commands:

```.sh
npm install
npm run dev
```

The application should now be running at `localhost:2275`

NOTE: By default, the front end will be connected to our remote server on the flip servers. To connect it to your local server, you will have to update all the queries so that they request from your local server instead of our project flip server. Every query that looks like this (`http://flip3.engr.oregonstate.edu:557676/\[EntityName\])` should be converted to something like this: `http://localhost:55767/\[EntityName\]`. If you are testing the front and backend separately, this change isn't necessary so long as you are connected to OSU via VPN and can access our remote server.
