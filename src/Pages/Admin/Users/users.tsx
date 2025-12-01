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

interface ApiResponse<T> {
  status: number;
  message: string;
  data: T[];
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

  const users = useFetch<ApiResponse<User>>(
    `${config.apiUrlAdminV1}/users?search=${debounceSearch}&status=${status}`,
    token
  );

  const roles = useFetch<ApiResponse<Role>>(
    `${config.apiUrlAdminV1}/roles`,
    token
  );

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
      roles: [Number(key.currentKey)], // MUST BE A NUMBER ARRAY
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
    try {
      await request.makeRequest(formData);
      addToast({
        title: "Added successfully",
        description: request?.data.message,
        color: "success",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    } catch (error) {
      addToast({
        title: "Failed",
        description: request.error?.response?.data?.message,
        color: "danger",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    }
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

            {/* FORM */}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
              <ModalContent>
                <form onSubmit={handleSubmit}>
                  <ModalHeader>Add User</ModalHeader>

                  <ModalBody>
                    <div className="grid grid-cols-[1fr,2fr] gap-4">
                      <Input
                        name="username"
                        label="User Name"
                        onChange={handleChange}
                      />
                      <Input
                        name="email"
                        label="Email"
                        type="email"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="flex gap-4">
                      <Input
                        name="password"
                        label="Password"
                        type="password"
                        onChange={handleChange}
                      />
                      <Input
                        name="password_confirmation"
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

                    <div className="flex gap-4">
                      <Input
                        name="firstname"
                        label="First Name"
                        onChange={handleChange}
                      />
                      <Input
                        name="lastname"
                        label="Last Name"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="flex gap-4">
                      <Input
                        name="phone"
                        label="Phone Number"
                        onChange={handleChange}
                      />
                      <Input
                        name="birthdate"
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
                      color="primary"
                      isLoading={request.isLoading}
                    >
                      Save
                    </Button>
                  </ModalFooter>
                </form>
              </ModalContent>
            </Modal>
          </div>

          <Select
            label="Filter status"
            items={userStatus}
            onSelectionChange={(e: any) => setStatus(e.currentKey)}
          >
            {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
          </Select>
        </div>
      </div>

      <DataTable
        headers={headers}
        data={users?.data || []}
        loading={users.loading}
        renderers={userStatusRenderer}
      />
    </div>
  );
};

export default Users;
