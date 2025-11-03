import { Button, DatePicker, Form } from "@heroui/react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { NumberInput } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { useRoomTypeContext } from "../../../../contexts/roomTypeContext";
import { disablePreviousDates } from "../../../../helpers/disablePreviousDate";

const BookingFilter = () => {
  const { roomTypes, setRoomTypes } = useRoomTypeContext();
  //Handle input value
  const handleRoomTypeValue = (value: any, data: string) => {
    setRoomTypes((prev: any) => ({
      ...prev,
      [data]: value,
    }));
  };

  const navigate = useNavigate();
  const handleFilterRoom = (e: any) => {
    e.preventDefault();
    localStorage.setItem("_roomFilter", JSON.stringify(roomTypes));
    navigate("/room");
  };

  const isDateUnavailable = disablePreviousDates();

  return (
    <div className="w-full flex justify-center lg:mt-28">
      <Form
        className="py-10 px-[3.5rem] bg-[#2E2E2E] shadow-[#A8A07B] shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] items-center rounded-2xl"
        onSubmit={handleFilterRoom}
      >
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="flex flex-col lg:flex-row gap-4 text-white">
            <div className="h-24 flex items-center pr-4">
              <DatePicker
                className="w-48 filter_date"
                aria-label="Appointment date"
                isDateUnavailable={isDateUnavailable}
                label="Start date"
                minValue={today(getLocalTimeZone())}
                variant="underlined"
                isRequired
                onChange={(e: any) => {
                  handleRoomTypeValue(e, "start_date");
                }}
                classNames={{
                  label: "text-white",
                  input: "text-sm lg:text-lg",
                }}
              />
            </div>
            <div className="h-24 flex items-center pr-4">
              <DatePicker
                className="filter_date w-48"
                aria-label="Appointment date"
                isDateUnavailable={isDateUnavailable}
                label="End date"
                minValue={today(getLocalTimeZone())}
                isRequired
                variant="underlined"
                onChange={(e: any) => {
                  handleRoomTypeValue(e, "end_date");
                }}
                classNames={{
                  label: "text-white",
                  input: "text-sm lg:text-lg", // responsive text size
                }}
              />
            </div>
          </div>

          <div className="h-24 flex items-center pr-4">
            <NumberInput
              className="numberOfPerson text-lg lg:text-lg max-w-xs w-48"
              variant="underlined"
              isRequired
              label="Number of Person"
              onChange={(e: any) => {
                handleRoomTypeValue(e ?? 0, "persons");
              }}
              classNames={{
                label: "text-white",
                input: "text-sm lg:text-lg !important",
                base: "w-full lg:w-48",
              }}
            />
          </div>
          <div>
            <Button
              type="submit"
              className="bg-yuma-300 px-10 text-white"
              radius="sm"
            >
              Search Room
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default BookingFilter;
