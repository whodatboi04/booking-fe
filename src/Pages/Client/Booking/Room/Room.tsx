import axios from "axios";
import { useEffect, useState } from "react";
import { useBookingContext } from "../../../../contexts/BookingContext";
import { Card, CardHeader, CardBody, Image, Input } from "@heroui/react";
import { Skeleton } from "@heroui/skeleton";
import { CiSearch } from "react-icons/ci";

const RoomSkeleton = () => {
  return (
    <>
      <div className="flex gap-8">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="w-80 h-80 space-y-5 p-4 gap-10" radius="lg">
            <Skeleton className="rounded-lg">
              <div className="h-40 rounded-lg bg-default-300" />
            </Skeleton>
            <div className="space-y-3">
              <Skeleton className="w-3/5 rounded-lg">
                <div className="h-3 w-3/5 rounded-lg bg-default-200" />
              </Skeleton>
              <Skeleton className="w-4/5 rounded-lg">
                <div className="h-3 w-4/5 rounded-lg bg-default-200" />
              </Skeleton>
              <Skeleton className="w-2/5 rounded-lg">
                <div className="h-3 w-2/5 rounded-lg bg-default-300" />
              </Skeleton>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

const Room = () => {
  // const { bookings, setBookings } = useBookingContext();
  const [rooms, setRooms] = useState<any>();
  const [fetching, setFething] = useState<boolean>(false);

  //Fetch Room Types from api
  const fetchRoomTypes = async () => {
    setFething(true);
    try {
      const roomFilterStr = localStorage.getItem("_roomFilter");
      const roomFilter = roomFilterStr ? JSON.parse(roomFilterStr) : null;

      console.log(roomFilter?.persons);
      const apiUrl =
        "http://192.168.123.147:8080/api/v1/room-types?persons=" +
        roomFilter?.persons +
        "&search=";
      const response = await axios(apiUrl);
      setRooms(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setFething(false);
    }
  };

  const SearchFilter = () => {
    return (
      <Input
        isClearable
        classNames={{
          label: "text-black/50 dark:text-white/90",
          input: [
            "bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "shadow-xl",
            "bg-default-200/50",
            "dark:bg-default/60",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "dark:hover:bg-default/70",
            "group-data-[focus=true]:bg-default-200/50",
            "dark:group-data-[focus=true]:bg-default/60",
            "!cursor-text",
          ],
        }}
        label="Search"
        placeholder="Type to search..."
        radius="lg"
        startContent={<CiSearch />}
      />
    );
  };

  useEffect(() => {
    fetchRoomTypes();
  }, []);

  return (
    <div className=" max-w-screen flex flex-col items-center px-24">
      <div className=" w-[1440px] px-10 flex flex-wrap gap-4 items-center">
        <SearchFilter />
        {fetching ? (
          <RoomSkeleton />
        ) : (
          rooms &&
          rooms.map((room: any) => (
            <div key={room.id} className="max-w-80 flex flex-col items-center">
              <Card className="p-4">
                <CardBody className="overflow-visible py-2">
                  <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src="https://heroui.com/images/hero-card-complete.jpeg"
                    width={270}
                  />
                </CardBody>
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                  <h4 className="font-bold text-large">
                    Room Type: {room.name}
                  </h4>
                  <p>Price: {room.price}</p>
                  <p>Room Capacity: {room.room_capacity}</p>
                  <small className="text-default-500">
                    Description: {room.description}
                  </small>
                </CardHeader>
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Room;
