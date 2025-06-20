import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";

export const ClientLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};
