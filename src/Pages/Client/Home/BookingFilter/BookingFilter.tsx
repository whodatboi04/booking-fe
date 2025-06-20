import { DatePicker, Form } from "@heroui/react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { NumberInput } from "@heroui/react";
import { PrimaryButton } from "../../../../components/Buttons/Button";
import { useBookingContext } from "../../../../contexts/BookingContext";
import { useNavigate } from "react-router-dom";

const BookingFilter = () => {
  interface items {
    id: number;
    label: string;
  }

  const { bookings, setBookings } = useBookingContext();
  //Handle input value
  const handleRoomTypeValue = (value: any, data: string) => {
    setBookings((prev: any) => ({
      ...prev,
      [data]: value,
    }));
  };

  const navigate = useNavigate();
  const handleFilterRoom = (e: any) => {
    e.preventDefault();
    localStorage.setItem("_roomFilter", JSON.stringify(bookings));
    navigate("/room");
  };

  let now = today(getLocalTimeZone());
  let disabledRanges = [[now, now]];

  let isDateUnavailable = (date: any) =>
    disabledRanges.some(
      (interval) =>
        date.compare(interval[0]) >= 0 && date.compare(interval[1]) <= 0
    );

  return (
    <div className="w-full flex justify-center">
      <Form
        className="h-48 w-[90%] bg-[#131313] shadow-[#A8A07B] shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] flex flex-row justify-center items-center rounded-2xl"
        onSubmit={handleFilterRoom}
      >
        <div className="flex flex-row gap-4 items-center">
          <div className="flex flex-row gap-4 text-white">
            <div className="h-24 flex items-center pr-4">
              <DatePicker
                className="w-48 filter_date"
                aria-label="Appointment date"
                isDateUnavailable={isDateUnavailable}
                label="Start date"
                minValue={today(getLocalTimeZone())}
                variant="underlined"
                isRequired
                size="lg"
                onChange={(e: any) => {
                  handleRoomTypeValue(e, "start_date");
                }}
                classNames={{
                  label: "text-white",
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
                size="lg"
                onChange={(e: any) => {
                  handleRoomTypeValue(e, "end_date");
                }}
                classNames={{
                  label: "text-white",
                }}
              />
            </div>
          </div>

          <div className="h-24 flex items-center  pr-4">
            <NumberInput
              className="numberOfPerson max-w-xs"
              variant="underlined"
              isRequired
              label="Number of Person"
              size="lg"
              onChange={(e: any) => {
                handleRoomTypeValue(e ?? 0, "persons");
              }}
              classNames={{
                label: "text-white",
              }}
            />
          </div>
          <div>
            <PrimaryButton type="submit">Search Room</PrimaryButton>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default BookingFilter;
