import React from "react";
import { FaRegUser } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import CircleCharts from "../../../components/CircleCharts";

const dashboard = () => {
  return (
    <div className="w-full p-16 flex flex-col gap-4">
      <div className=" w-full flex flex-row justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Welcome back, Admin!</h1>
          <p className="text-sm text-gray-500 font-light">
            It is the best time to manage sales
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <button className="border-1 border-gray-400 rounded-full p-2">
            <IoMdNotificationsOutline size={25} />
          </button>
          <button className="border-1 border-gray-400 rounded-full p-2">
            <IoSearchOutline size={25} />
          </button>
          <div className="flex items-center border-1 border-gray-400 rounded-full">
            <div className="border-1 border-gray-400 rounded-full p-2">
              <FaRegUser size={30} />
            </div>
            <div className="flex flex-col px-4">
              <h1>Admin User</h1>
              <p className="font-light text-sm text-gray-500">
                test@example.com
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <CircleCharts />
      </div>
    </div>
  );
};

export default dashboard;
