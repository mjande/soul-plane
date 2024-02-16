import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Root from "./routes/Root.tsx";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './routes/Home.tsx';
import ErrorPage from './static/ErrorPage.tsx';
import Airports from './routes/Airports.tsx';
import Flights from './routes/Flights.tsx';
import PassengerFlights from './routes/PassengerFlights.tsx';
import Passengers from './routes/Passengers.tsx';
import Planes from './routes/Planes.tsx';
import PlaneTypes from './routes/PlaneTypes.tsx';

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
        path: "/PassengerFlights",
        element: <PassengerFlights />,
      },
      {
        path: "/Passengers",
        element: <Passengers />,
      },
      {
        path: "/Planes",
        element: <Planes />,
      },
      {
        path: "/PlaneTypes",
        element: <PlaneTypes />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)