import React, { useState } from "react";
import DataTable from "../../../components/DataTable";
import config from "../../../config/app.config";
import Cookies from "js-cookie";
import { useFetch } from "../../../hooks/useFetch";
import {
  addToast,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@heroui/react";
import { FaPlus } from "react-icons/fa";
import Search from "../../../components/Search";
import { useDebounce } from "../../../hooks/useDebounce";
import { Failed, Success } from "../../../components/Status/status";
import usePost from "../../../hooks/usePost";

const headers = [
  { key: "username", header: "USERNAME" },
  { key: "email", header: "EMAIL" },
  { key: "firstname", header: "FIRSTNAME" },
  { key: "lastname", header: "LASTNAME" },
  { key: "roles", header: "ROLE" },
  { key: "status", header: "Status" },
];

type User = {
  id: number;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  created_at: string;
  roles: string[];
  status: number;
};

type Role = {
  id: number;
  name: string;
  created_at: string;
};

type Pagination = {
  current_page: number;
  per_page: number;
  total: number;
};

interface ApiResponse<T> {
  status: number;
  message: string;
  data: T[];
  pagination: Pagination;
  success: boolean;
}

const userStatusRenderer = {
  status: (value: number) =>
    value === 1 ? <Success>Active</Success> : <Failed>Inactive</Failed>,
};

const userStatus = [
  { key: 1, label: "Active" },
  { key: 0, label: "Inactive" },
];

const Users: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const debounceSearch = useDebounce(searchValue);
  const [status, setStatus] = useState("");
  const token = Cookies.get("token") || "";
  const [reload, setReload] = useState(0);
  const [page, setPage] = useState(1);

  //FETCH DATA
  const users = useFetch<ApiResponse<User>>(
    `${config.apiUrlAdminV1}/users?search=${debounceSearch}&status=${status}&page=${page}`,
    token,
    reload
  );
  const roles = useFetch<ApiResponse<Role>>(
    `${config.apiUrlAdminV1}/roles`,
    token
  );

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    roles: [] as number[],
    firstname: "",
    lastname: "",
    phone: "",
    birthdate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleSelect = (key: any) => {
    setFormData((prev) => ({
      ...prev,
      roles: [Number(key.currentKey)],
    }));
  };

  const handleDateChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const request = usePost(config.apiUrlAdminV1 + "/users", token);
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await request.makeRequest(formData);
    if (request.error) {
      addToast({
        title: "Add user failed",
        description: request.error?.response?.data?.message ?? "Unknown error",
        color: "danger",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    } else {
      addToast({
        title: "Added successfully",
        description: request?.data?.message,
        color: "success",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    }

    onClose();
    setReload((prev) => prev + 1);
    setFormData({
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
      roles: [] as number[],
      firstname: "",
      lastname: "",
      phone: "",
      birthdate: "",
    });
  };

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
              className="bg-yuma-300 text-white w-44"
              radius="sm"
              onPress={onOpen}
            >
              <FaPlus /> Add User
            </Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
              <ModalContent>
                <form onSubmit={handleSubmit}>
                  <ModalHeader>Add User</ModalHeader>

                  <ModalBody>
                    <h1 className="text-center text-lg font-semibold">
                      User Account
                    </h1>
                    <div className="grid grid-cols-[1fr,2fr] gap-4">
                      <Input
                        name="username"
                        label="User Name"
                        onChange={handleChange}
                        autoComplete="username"
                      />
                      <Input
                        name="email"
                        autoComplete="email"
                        label="Email"
                        type="email"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="flex gap-4">
                      <Input
                        name="password"
                        autoComplete="password"
                        label="Password"
                        type="password"
                        onChange={handleChange}
                      />
                      <Input
                        name="password_confirmation"
                        autoComplete="password_confirmation"
                        label="Confirm Password"
                        type="password"
                        onChange={handleChange}
                      />

                      <Select
                        label="Select Role"
                        items={roles?.data?.data || []}
                        selectionMode="single"
                        onSelectionChange={handleRoleSelect}
                      >
                        {(item) => (
                          <SelectItem key={item.id}>{item.name}</SelectItem>
                        )}
                      </Select>
                    </div>

                    <hr />
                    <h1 className="text-center text-lg font-semibold">
                      User Profile
                    </h1>
                    <div className="flex gap-4">
                      <Input
                        name="firstname"
                        autoComplete="firstname"
                        label="First Name"
                        onChange={handleChange}
                      />
                      <Input
                        name="lastname"
                        autoComplete="lastname"
                        label="Last Name"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="flex gap-4">
                      <Input
                        name="phone"
                        autoComplete="phone"
                        label="Phone Number"
                        onChange={handleChange}
                      />
                      <Input
                        name="birthdate"
                        autoComplete="birthdate"
                        type="date"
                        label="Birthdate"
                        onChange={(e: any) =>
                          handleDateChange("birthdate", e.target.value)
                        }
                      />
                    </div>
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      variant="light"
                      color="danger"
                      onPress={onOpenChange}
                    >
                      Close
                    </Button>

                    <Button
                      type="submit"
                      isLoading={request.isLoading}
                      className="bg-yuma-400 text-white active:bg-yuma-500"
                    >
                      Add
                    </Button>
                  </ModalFooter>
                </form>
              </ModalContent>
            </Modal>
          </div>
          <div className="flex gap-4">
            <Select
              label="Filter status"
              items={userStatus}
              onSelectionChange={(e: any) => setStatus(e.currentKey)}
              size="sm"
            >
              {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
            </Select>
            <Select
              label="Filter role"
              items={userStatus}
              onSelectionChange={(e: any) => setStatus(e.currentKey)}
              size="sm"
            >
              {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
            </Select>
          </div>
        </div>
      </div>

      <DataTable
        headers={headers}
        data={users?.data || []}
        loading={users.loading}
        renderers={userStatusRenderer}
        pages={users?.data?.pagination?.total ?? 0}
        page={page}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
};

export default Users;
