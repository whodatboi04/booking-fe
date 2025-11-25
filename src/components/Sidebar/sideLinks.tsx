import { FaRegCalendarCheck, FaUserPlus } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { CiSettings } from "react-icons/ci";
import { IoMdHelpCircle } from "react-icons/io";
import { RiLogoutBoxRLine } from "react-icons/ri";

export const sideLinks = [
  {
    id: 1,
    title: "Dashboard",
    href: "/admin",
    icon: <MdOutlineDashboard />,
  },
  {
    id: 2,
    title: "Manage Bookings",
    href: "/admin/manage-bookings",
    icon: <FaRegCalendarCheck />,
  },
  {
    id: 4,
    title: "Room Types",
    href: "/admin/room-types",
    icon: <IoAddCircle />,
  },
  {
    id: 5,
    title: "Transactions",
    href: "/admin/transactions",
    icon: <GrTransaction />,
  },
  {
    id: 6,
    title: "Users",
    href: "/admin/users",
    icon: <FaUserPlus />,
  },
  {
    id: 7,
    title: "Settings",
    href: "/admin/settings",
    icon: <CiSettings />,
  },
];

export const bottomLinks = [
  {
    id: 8,
    title: "Help",
    href: "#settings",
    icon: <IoMdHelpCircle />,
  },
  {
    id: 9,
    title: "Logout",
    href: "#settings",
    icon: <RiLogoutBoxRLine />,
  },
];
