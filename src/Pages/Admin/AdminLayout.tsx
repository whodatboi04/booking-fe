import { ToastProvider } from "@heroui/react";
import Sidebar from "../../components/Sidebar";
import { Outlet } from "react-router-dom";

export const AdminLayout = () => {
  return (
    <div className="flex">
      <ToastProvider placement="top-right" toastOffset={60} />
      <Sidebar />
      <Outlet />
    </div>
  );
};
