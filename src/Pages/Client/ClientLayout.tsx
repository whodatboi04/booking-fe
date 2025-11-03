import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { ToastProvider } from "@heroui/react";
import Footer from "../../components/Footer";

export const ClientLayout = () => {
  return (
    <div>
      <ToastProvider placement="top-right" toastOffset={60} />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
