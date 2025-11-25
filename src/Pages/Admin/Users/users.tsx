import React, { useState } from "react";
import DataTable from "../../../components/DataTable";
import config from "../../../config/app.config";
import Cookies from "js-cookie";
import { useFetch } from "../../../hooks/useFetch";
import { Button, Select, SelectItem } from "@heroui/react";
import { FaPlus } from "react-icons/fa";
import Search from "../../../components/Search";
import { useDebounce } from "../../../hooks/useDebounce";

const headers = [
  { key: "username", header: "USERNAM" },
  { key: "email", header: "EMAIL" },
  { key: "firstname", header: "FIRSTNAME" },
  { key: "lastname", header: "LASTNAME" },
  { key: "roles", header: "ROLE" },
  { key: "status", header: "Status" },
];

const Users: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const debounceSearch = useDebounce(searchValue);
  const apiUrl = config.apiUrlV1 + "/users?" + `search=${debounceSearch}`;
  const token = Cookies.get("token") || "";
  const { data, loading } = useFetch<Response>(apiUrl, token);

  return (
    <div className="w-full p-28 flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="w-72 flex flex-col justify-between">
          <h1 className="font-semibold text-2xl">Users</h1>
          <Search value={searchValue} onChange={setSearchValue} />
        </div>
        <div className="w-96 flex flex-col gap-4">
          <div className="flex justify-end">
            <Button
              className="bg-yuma-300 text-white w-44 active:bg-yuma-400"
              radius="sm"
            >
              <span>
                <FaPlus />
              </span>
              Add User
            </Button>
          </div>

          <div className="flex gap-4 ">
            <Select className="max-w-xs" label="Select an animal" size="sm">
              <SelectItem>Hello</SelectItem>
            </Select>
            <Select className="max-w-xs" label="Select an animal" size="sm">
              <SelectItem>Hello</SelectItem>
            </Select>
          </div>
        </div>
      </div>
      <DataTable headers={headers} data={data} loading={loading} />
    </div>
  );
};

export default Users;
