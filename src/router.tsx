import { createBrowserRouter } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Home from "./Pages/Client/Home";
import Room from "./Pages/Client/Booking/Room/Room";
import { ClientLayout } from "./Pages/Client/ClientLayout";
import BookingForm from "./Pages/Client/Booking/BookingForm";
import AdminLogin from "./Pages/Auth/AdminLogin/AdminLogin";

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
        element: <BookingForm />,
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
