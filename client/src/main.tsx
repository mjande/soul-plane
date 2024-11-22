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
import { PassengerForm } from './routes/Passengers/PassengerForm.tsx';
import { DeletePassengerForm } from './routes/Passengers/DeletePassengerForm.tsx';
import { PassengerFlightsForm } from './routes/PassengerFlights/PassengerFlightsForm.tsx';
import { DeletePassengerFlightsForm } from './routes/PassengerFlights/DeletePassengerFlightsForm.tsx';
import { DeletePlaneForm } from './routes/Planes/DeletePlaneForm.tsx';
import { PlaneForm } from './routes/Planes/PlaneForm.tsx';
import { DeleteFlightForm } from './routes/Flights/DeleteFlightForm.tsx';
import { FlightForm } from './routes/Flights/FlightForm.tsx';
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
        path: "/flights",
        element: <Flights/>,
      },
      {
        path: "/flights/new",
        element: <FlightForm />
      },
      {
        path: "/flights/edit/:id",
        element: <FlightForm />
      },
      {
        path: "/flights/delete/:id",
        element: <DeleteFlightForm />
      },
      {
        path: "/passenger-flights",
        element: <PassengerFlights />,
      },
      {
        path: "/passenger-flights/new",
        element: <PassengerFlightsForm />,
      },
      {
        path:"/passenger-flights/delete/:fid/:pid",
        element: <DeletePassengerFlightsForm />,
      },
      {
        path: "/passengers",
        element: <Passengers />,
      },
      {
        path: "/passengers/new",
        element: <PassengerForm />,
      },
      {
        path: "/passengers/edit/:id",
        element: <PassengerForm />,
      },
      {
        path:"/passengers/delete/:id",
        element: <DeletePassengerForm />,
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
