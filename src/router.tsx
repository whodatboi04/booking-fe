import { createBrowserRouter } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Home from "./Pages/Client/Home";
import Room from "./Pages/Client/Booking/Room/Room";
import { ClientLayout } from "./Pages/Client/ClientLayout";

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
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
