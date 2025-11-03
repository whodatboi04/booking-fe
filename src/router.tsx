import { createBrowserRouter } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Home from "./Pages/Client/Home";
import Room from "./Pages/Client/Booking/Room/Room";
import { ClientLayout } from "./Pages/Client/ClientLayout";
import AdminLogin from "./Pages/Auth/AdminLogin/AdminLogin";
import Booking from "./Pages/Client/Booking/BookingForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/room",
        element: <Room />,
      },

      {
        path: "/booking",
        element: <Booking />,
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/admin",
    element: <AdminLogin />,
  },
]);

export default router;
