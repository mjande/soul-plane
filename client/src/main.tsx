import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Root from "./routes/Root.tsx";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './routes/Home.tsx';
import ErrorPage from './static/ErrorPage.tsx';
import Airports from './routes/Airports/Airports.tsx';
import Flights from './routes/Flights/Flights.tsx';
import PassengerFlights from './routes/PassengerFlights/PassengerFlights.tsx';
import Passengers from './routes/Passengers/Passengers.tsx';
import Planes from './routes/Planes/Planes.tsx';
import PlaneTypes from './routes/PlaneTypes/PlaneTypes.tsx';
import { PlaneTypeForm } from './routes/PlaneTypes/PlaneTypeForm.tsx'
import DeletePlaneTypeForm from './routes/PlaneTypes/DeletePlaneTypeForm.tsx';
import NewPassengersForm from './routes/Passengers/NewPassengersForm.tsx';
import UpdatePassengersForm from './routes/Passengers/UpdatePassengersForm.tsx';
import DeletePassengersForm from './routes/Passengers/DeletePassengersForm.tsx';
import NewPassengerFlights from './routes/PassengerFlights/NewPassengerFlightsForm.tsx';
import DeletePassengerFlightsForm from './routes/PassengerFlights/DeletePassengerFlightsForm.tsx';
import UpdatePassengerFlightsForm from './routes/PassengerFlights/UpdatePassengerFlightsForm.tsx';
import { DeletePlaneForm } from './routes/Planes/DeletePlaneForm.tsx';
import { PlaneForm } from './routes/Planes/PlaneForm.tsx';
import NewFlightForm from './routes/Flights/NewFlightForm.tsx';
import DeleteFlightForm from './routes/Flights/DeleteFlightForm.tsx';
import { UpdateFlightForm } from './routes/Flights/UpdateFlightForm.tsx';
import { AirportForm } from './routes/Airports/AirportForm.tsx';
import { DeleteAirportForm } from './routes/Airports/DeleteAirportForm.tsx';

// Utilize Browser Router from React Router to set up Pages
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      // Routing for pages
      {
        path:"/",
        element: <Home />
      },
      {
        path: "/airports",
        element: <Airports/>,
      },
      {
        path: '/airports/new',
        element: <AirportForm />
      },
      {
        path: "/airports/edit/:id",
        element: <AirportForm />,
      },
      {
        path: "/airports/delete/:id",
        element: <DeleteAirportForm />
      },
      {
        path: "/Flights",
        element: <Flights/>,
      },
      {
        path: "/Flights/new",
        element: <NewFlightForm />
      },
      {
        path: "/Flights/update/:id",
        element: <UpdateFlightForm />
      },
      {
        path: "Flights/delete/:id",
        element: <DeleteFlightForm />
      },
      {
        path: "/PassengerFlights",
        element: <PassengerFlights />,
      },
      {
        path: "/PassengerFlights/new",
        element: <NewPassengerFlights />,
      },
      {
        path:"/PassengerFlights/update/:fid/:pid",
        element: <UpdatePassengerFlightsForm />,
      },
      {
        path:"/PassengerFlights/delete/:fid/:pid",
        element: <DeletePassengerFlightsForm />,
      },
      {
        path: "/Passengers",
        element: <Passengers />,
      },
      {
        path: "/Passengers/new",
        element: <NewPassengersForm />,
      },
      {
        path: "/Passengers/update/:id",
        element: <UpdatePassengersForm />,
      },
      {
        path:"/Passengers/delete/:id",
        element: <DeletePassengersForm />,
      },
      {
        path: "/planes",
        element: <Planes />,
      },
      {
        path: "/planes/new",
        element: <PlaneForm />
      },
      {
        path: "/planes/edit/:id",
        element: <PlaneForm />
      },
      {
        path: "/planes/delete/:id",
        element: <DeletePlaneForm />
      },
      {
        path: "/plane-types",
        element: <PlaneTypes />,
      },
      {
        path: "/plane-types/new",
        element: <PlaneTypeForm />
      },
      {
        path: "/plane-types/edit/:id",
        element: <PlaneTypeForm />
      },
      {
        path: "/plane-types/delete/:id",
        element: <DeletePlaneTypeForm />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
