import React, { useState } from "react";
import {
  addToast,
  Button,
  Checkbox,
  DatePicker,
  Input,
  NumberInput,
  Select,
  SelectItem,
} from "@heroui/react";
import { disablePreviousDates } from "../../../../helpers/disablePreviousDate";
import { useLocation } from "react-router-dom";
import axios from "axios";
import config from "../../../../config/app.config";

const BookingForm = () => {
  const [isDiscountChecked, setDiscountChecked] = useState<any>(false);
  const isDateUnavailable = disablePreviousDates();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const location = useLocation();
  const roomType = location.state?.modalValue;
  console.log(roomType.id);
  const [formData, setFormData] = useState({
    room_type_id: roomType?.id,
    firstname: "",
    middlename: "",
    lastname: "",
    email: "",
    number_of_persons: 1,
    discount_id: "",
    discount_id_picture: "",
    start_date: "",
    end_date: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (name: string, dateValue: any) => {
    const formattedDate = dateValue.toString();

    setFormData((prev) => ({
      ...prev,
      [name]: formattedDate,
    }));
  };

  const handleDiscountChecker = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setDiscountChecked(checked);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await axios.post(
        config.apiUrl + "/v1/booking",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      addToast({
        title: response.data.message,
        color: "success",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    } catch (error: any) {
      addToast({
        title: error.response.data.message,
        color: "danger",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex">
        <div className="w-[50%] p-10 flex flex-col gap-8">
          <img
            src={roomType.room_image}
            alt=""
            className="rounded-lg w-[50%] m-auto aspect-square object-cover object-bottom"
          />
          <p>{roomType.description}</p>
        </div>

        <div className="w-[50%] flex flex-col justify-center">
          <h1 className="text-2xl font-semibold text-center">BOOKING FORM</h1>
          <div className="p-10 broder-2 flex flex-col justify-center items-center">
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div className="flex gap-8">
                <Input
                  label="First Name"
                  name="firstname"
                  value={formData.firstname}
                  type="text"
                  radius="sm"
                  onChange={handleChange}
                />
                <Input
                  label="Middle Name"
                  name="middlename"
                  value={formData.middlename}
                  type="text"
                  radius="sm"
                  onChange={handleChange}
                />
                <Input
                  label="Last Name"
                  name="lastname"
                  value={formData.lastname}
                  type="text"
                  radius="sm"
                  onChange={handleChange}
                />
              </div>
              <div className="flex gap-8 items-center">
                <Input
                  label="Email"
                  name="email"
                  value={formData.email}
                  type="email"
                  radius="sm"
                  className="w-[60%]"
                  onChange={handleChange}
                />
                <NumberInput
                  className="w-[40%]"
                  type="number"
                  name="number_of_persons"
                  value={formData.number_of_persons}
                  isRequired
                  label="Number of Person"
                  onChange={(e: any) => handleChange(e)}
                />
              </div>
              <div className="flex gap-5">
                <DatePicker
                  name="start_date"
                  aria-label="Appointment date"
                  isDateUnavailable={isDateUnavailable}
                  label="Start date"
                  isRequired
                  onChange={(date: any) => handleDateChange("start_date", date)}
                />
                <DatePicker
                  name="end_date"
                  aria-label="Appointment date"
                  isDateUnavailable={isDateUnavailable}
                  label="End date"
                  isRequired
                  onChange={(date: any) => handleDateChange("end_date", date)}
                />
              </div>
              <Checkbox onChange={(e) => handleDiscountChecker(e)}>
                <span className="text-sm">
                  I am a senior citizen or person with disability (PWD)
                </span>
              </Checkbox>

              {isDiscountChecked && (
                <div className="flex gap-8">
                  <Select
                    className="max-w-xs"
                    label="Select type"
                    selectedKeys={[formData.discount_id]}
                    onChange={(e: any) => handleChange(e)}
                  >
                    <SelectItem key="1" textValue="PWD">
                      PWD
                    </SelectItem>
                    <SelectItem key="2" textValue="SENIOR">
                      SENIOR
                    </SelectItem>
                  </Select>
                  <Input
                    classNames={{
                      label: "text-white",
                    }}
                    label="Senior/PWD ID"
                    name="discount_id_picture"
                    value={formData.discount_id_picture}
                    type="file"
                    onChange={handleChange}
                  />
                </div>
              )}
              <Button
                isLoading={isLoading}
                type="submit"
                className="bg-yuma-300 w-96 m-auto"
                radius="sm"
              >
                Book Now
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingForm;
