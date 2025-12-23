import React, { useState } from "react";
import DataTable from "../../../components/DataTable";
import config from "../../../config/app.config";
import { useFetch } from "../../../hooks/useFetch";
import Cookies from "js-cookie";
import {
  Button,
  Chip,
  CircularProgress,
  DateRangePicker,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
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
import Search from "../../../components/Search";
import { formatDate } from "../../../helpers/formatDate";
import type { RangeValue } from "@react-types/shared";
import type { DateValue } from "@react-types/datepicker";
import { TbDotsVertical } from "react-icons/tb";

const headers = [
  { key: "reference_no", header: "REFERENCE NUMBER" },
  { key: "name", header: "NAME" },
  { key: "room_type", header: "ROOM TYPE" },
  { key: "start_date", header: "START DATE" },
  { key: "end_date", header: "END DATE" },
  { key: "amount", header: "AMOUNT" },
  { key: "total_amount", header: "TOTAL" },
  { key: "status", header: "STATUS" },
  { key: "action", header: "ACTION" },
];

type Bookings = {
  id: number;
  reference_no: string;
  name: string;
  room_type: string;
  amount: string;
  total_amount: string;
  start_date: string;
  end_date: string;
  created_at: string;
  status: number;
};

interface bookingDetails extends Bookings {
  room_no: string;
  discount: string;
  number_of_persons: number;
}

type Pagination = {
  current_page: number;
  per_page: number;
  total: number;
};

interface ShowApiResponse<T> {
  status: number;
  message: string;
  data: T;
  success: boolean;
}

interface CollectionApiResponse<T> {
  status: number;
  message: string;
  data: T[];
  pagination: Pagination;
  success: boolean;
}

const bookingStatus = [
  { key: 0, label: "Paid" },
  { key: 1, label: "Pending" },
  { key: 2, label: "Expired" },
  { key: 3, label: "Failed" },
];

const manageBookings = () => {
  const [searchValue, setSearchValue] = useState("");
  const [status, setStatus] = useState("");
  const token = Cookies.get("token") || "";
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState("");
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [startDate, setStartDate] = useState<RangeValue<DateValue> | null>(
    null
  );
  const startDateFrom = formatDate(startDate?.start);
  const startDateTo = formatDate(startDate?.end);

  const [endDate, setEndDate] = useState<RangeValue<DateValue> | null>(null);
  const endDateFrom = formatDate(endDate?.start);
  const endDateTo = formatDate(endDate?.end);

  const apiUrl = `${config.apiUrlAdminV1}/bookings?search=${searchValue}&status=${status}&start_date_from=${startDateFrom}&start_date_to=${startDateTo}&end_date_from=${endDateFrom}&end_date_to=${endDateTo}&page=${page}`;
  const bookings = useFetch<CollectionApiResponse<Bookings>>(apiUrl, token);

  const bookingDetails = useFetch<ShowApiResponse<bookingDetails>>(
    selectedId ? `${config.apiUrlAdminV1}/bookings/${selectedId}` : "",
    token
  );

  const actionDropDownItem = [
    { key: "view", label: "View" },
    { key: "room", label: "Assign Room" },
  ];

  const bookingsRender = {
    status: (value: number) => {
      if (value == 0) {
        return <Chip color="success">Paid</Chip>;
      } else if (value == 1) {
        return <Chip color="warning">Pending</Chip>;
      } else if (value == 2) {
        return <Chip color="default">Expired</Chip>;
      } else {
        return <Chip color="warning">Failed</Chip>;
      }
    },
    action: (_: any, row: any) => (
      <Dropdown>
        <DropdownTrigger className="cursor-pointer">
          <button>
            <TbDotsVertical size={18} />
          </button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions" items={actionDropDownItem}>
          {(item) => (
            <DropdownItem
              key={item.key}
              textValue={item.label}
              onPress={() => {
                setSelectedId(row.id);
                onOpen();
              }}
            >
              {item.label}
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    ),
  };

  return (
    <div className="w-full p-28 flex flex-col gap-4">
      <div className=" flex justify-between">
        <div className="w-72 flex flex-col justify-between gap-4">
          <h1 className="font-semibold text-2xl">Manage Bookings</h1>
          <Search value={searchValue} onChange={setSearchValue} />
        </div>
        <div className=" w-[35rem] flex items-end">
          <div className="flex w-full gap-4">
            <Select
              label="Filter status"
              items={bookingStatus}
              onSelectionChange={(e: any) => setStatus(e.currentKey)}
              size="sm"
              className="flex justify-end"
            >
              {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
            </Select>
            <div className="flex flex-col gap-4">
              <DateRangePicker
                className="max-w-xs"
                label="Start Date"
                aria-label="Select date range"
                size="sm"
                value={startDate}
                onChange={setStartDate}
              />
              <DateRangePicker
                className="max-w-xs"
                label="End Date"
                aria-label="Select End range"
                size="sm"
                value={endDate}
                onChange={setEndDate}
              />
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
        <ModalContent>
          <ModalHeader>Booking Details</ModalHeader>
          <ModalBody>
            {bookingDetails.error && (
              <h1 className="text-red-500">Failed to load booking</h1>
            )}

            {bookingDetails.loading ? (
              <div className="h-[15rem] flex justify-center items-center">
                <CircularProgress aria-label="Loading..." color="primary" />
              </div>
            ) : (
              bookingDetails.data && (
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4">
                    <Input
                      isReadOnly
                      className="max-w-xs"
                      value={bookingDetails.data?.data.reference_no}
                      label="Reference Number"
                    />
                    <Input
                      isReadOnly
                      className="max-w-xs"
                      value={bookingDetails.data?.data.name}
                      label="Name"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Input
                      isReadOnly
                      className="max-w-xs"
                      value={bookingDetails.data?.data.reference_no}
                      label="Reference Number"
                    />
                    <Input
                      isReadOnly
                      className="max-w-xs"
                      value={bookingDetails.data?.data.name}
                      label="Name"
                    />
                  </div>
                </div>
              )
            )}
          </ModalBody>

          <ModalFooter>
            <Button variant="light" color="danger" onPress={onOpenChange}>
              Close
            </Button>

            <Button
              type="submit"
              className="bg-yuma-400 text-white active:bg-yuma-500"
            >
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <DataTable
        headers={headers}
        data={bookings?.data || []}
        loading={bookings.loading}
        renderers={bookingsRender}
        pages={bookings?.data?.pagination?.total ?? 0}
        page={page}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
};

export default manageBookings;
