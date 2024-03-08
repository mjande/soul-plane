import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Root from "./routes/Root.tsx";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './routes/Home.tsx';
import ErrorPage from './static/ErrorPage.tsx';
import Airports from './routes/Airports.tsx';
import Flights from './routes/Flights/Flights.tsx';
import PassengerFlights from './routes/PassengerFlights/PassengerFlights.tsx';
import Passengers from './routes/Passengers/Passengers.tsx';
import Planes from './routes/Planes/Planes.tsx';
import PlaneTypes from './routes/PlaneTypes/PlaneTypes.tsx';
import NewPlaneTypeForm from './routes/PlaneTypes/NewPlaneTypeForm.tsx'
import UpdatePlaneTypeForm from './routes/PlaneTypes/UpdatePlaneTypeForm.tsx';
import DeletePlaneTypeForm from './routes/PlaneTypes/DeletePlaneTypeForm.tsx';
import NewPassengersForm from './routes/Passengers/NewPassengersForm.tsx';
import UpdatePassengersForm from './routes/Passengers/UpdatePassengersForm.tsx';
import DeletePassengersForm from './routes/Passengers/DeletePassengersForm.tsx';
import NewPassengerFlights from './routes/PassengerFlights/NewPassengerFlightsForm.tsx';
import DeletePassengerFlightsForm from './routes/PassengerFlights/DeletePassengerFlightsForm.tsx';
import UpdatePassengerFlightsForm from './routes/PassengerFlights/UpdatePassengerFlightsForm.tsx';
import NewPlaneForm from './routes/Planes/NewPlaneForm.tsx';
import DeletePlaneForm from './routes/Planes/DeletePlaneForm.tsx';
import UpdatePlaneForm from './routes/Planes/UpdatePlaneForm.tsx';
import NewFlightForm from './routes/Flights/NewFlightForm.tsx';
import DeleteFlightForm from './routes/Flights/DeleteFlightForm.tsx';

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
        element: <Airports />,
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
        path: "/Planes",
        element: <Planes />,
      },
      {
        path: "/Planes/new",
        element: <NewPlaneForm />
      },
      {
        path: "/Planes/update/:id",
        element: <UpdatePlaneForm />
      },
      {
        path: "/Planes/delete/:id",
        element: <DeletePlaneForm />
      },
      {
        path: "/PlaneTypes",
        element: <PlaneTypes />,
      },
      {
        path: "/PlaneTypes/new",
        element: <NewPlaneTypeForm />
      },
      {
        path: "/PlaneTypes/update/:id",
        element: <UpdatePlaneTypeForm />
      },
      {
        path: "/PlaneTypes/delete/:id",
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
