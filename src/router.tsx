import { createBrowserRouter } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Home from "./Pages/Client/Home";
import Room from "./Pages/Client/Booking/Room/Room";
import { ClientLayout } from "./Pages/Client/ClientLayout";
import AdminLogin from "./Pages/Auth/AdminLogin/AdminLogin";
import BookingForm from "./Pages/Client/Booking/BookingForm";
import Dashboard from "./Pages/Admin/Dashboard";
import { AdminLayout } from "./Pages/Admin/AdminLayout";
import ManageBookings from "./Pages/Admin/ManageBookings";
import RoomTypes from "./Pages/Admin/RoomTypes";
import Transactions from "./Pages/Admin/Transactions";
import Users from "./Pages/Admin/Users";
import Settings from "./Pages/Admin/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      {
        index: true,
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
    path: "/admin-login",
    element: <AdminLogin />,
  },

  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "manage-bookings",
        element: <ManageBookings />,
      },
      {
        path: "room-types",
        element: <RoomTypes />,
      },
      {
        path: "transactions",
        element: <Transactions />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);

export default router;
