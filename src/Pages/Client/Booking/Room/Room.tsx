import axios from "axios";
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Input,
  useDisclosure,
  ModalBody,
} from "@heroui/react";
import { Skeleton } from "@heroui/skeleton";
import { CiSearch } from "react-icons/ci";
import { useDebounce } from "../../../../hooks/useDebounce";
import config from "../../../../config/app.config";
import CustomModal from "../../../../components/Modal/modal";
import { formatToPeso } from "../../../../helpers/formatToPeso";
import { useNavigate } from "react-router-dom";

const RoomSkeleton = () => {
  return (
    <>
      {[...Array(4)].map((_, i) => (
        <div key={i} className="max-w-80 flex items-center">
          <Card className=" w-80" radius="lg">
            <Skeleton className="rounded-lg">
              <div className="h-40 rounded-lg bg-default-300" />
            </Skeleton>
            <div className="space-y-3 py-12">
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
        </div>
      ))}
    </>
  );
};

const SearchFilter = ({ setSearch }: any) => {
  return (
    <div className="w-80">
      <Input
        type="text"
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
        onValueChange={(value) => setSearch(value)}
        startContent={<CiSearch />}
      />
    </div>
  );
};

const Room = () => {
  // const { bookings, setBookings } = useBookingContext();
  const [rooms, setRooms] = useState<any>();
  const [fetching, setFething] = useState<boolean>(false);
  const [search, setSearch] = useState<any>("");
  const debounceSearch = useDebounce(search);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalValue, setModalValue] = useState<any>();
  const navigate = useNavigate();
  const onClickHandler = (value: any) => {
    setModalValue(value);
    onOpen();
  };

  //Fetch Room Types from api
  const fetchRoomTypes = async () => {
    setFething(true);
    try {
      const roomFilterStr = localStorage.getItem("_roomFilter");
      const roomFilter = roomFilterStr ? JSON.parse(roomFilterStr) : null;

      const apiUrl =
        config.apiUrlV1 +
        "/room-types?persons=" +
        roomFilter?.persons +
        `&search=${search}`;
      const response = await axios(apiUrl);
      setRooms(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setFething(false);
    }
  };

  useEffect(() => {
    fetchRoomTypes();
  }, [debounceSearch]);

  return (
    <div className=" max-w-screen flex flex-col items-center px-24 ">
      <h1 className="text-3xl font-semibold">ROOMS</h1>
      <div className="max-w-10xl flex flex-col px-10 gap-10">
        <div className="flex justify-end">
          <SearchFilter setSearch={setSearch} />
        </div>
        <div className="grid grid-cols-4 gap-4">
          {fetching ? (
            <RoomSkeleton />
          ) : (
            rooms &&
            rooms.map((room: any) => (
              <div key={room.id} className="max-w-80 flex items-center">
                <Card
                  className="p-4 h-full"
                  isHoverable
                  isPressable
                  onPress={() => onClickHandler(room)}
                >
                  <CardBody className="overflow-visible py-2">
                    <Image
                      alt="Card background"
                      className="object-cover rounded-xl aspect-square"
                      src={room.room_image}
                      width={270}
                    />
                  </CardBody>
                  <CardHeader className="pb-0 pt-2 px-4 flex-col items-start text-left ">
                    <h4 className="font-bold text-large">{room.name}</h4>
                    <p>Price: {room.price}</p>
                    <p>Capacity: {room.room_capacity}</p>
                    <small className="text-default-500">
                      {room.description}
                    </small>
                  </CardHeader>
                </Card>
              </div>
            ))
          )}
        </div>
      </div>

      {modalValue && (
        <CustomModal
          isOpen={isOpen}
          onClose={onOpenChange}
          size="lg"
          backdrop="blur"
          actionText="Book Now"
          onAction={() => {
            navigate("/booking", { state: { modalValue } });
          }}
          actionButtonProps={{ className: "bg-[#C9C096]" }}
          closeButtonProps={{ color: "default" }}
        >
          <ModalBody>
            <Image
              src={modalValue.room_image}
              isBlurred
              fallbackSrc="https://via.placeholder.com/300x200"
              className="object-cover object-bottom rounded-xl aspect-square"
            />
            <div className="flex justify-between items-center">
              <h1 className="text-lg">{modalValue.name}</h1>
              <p>{formatToPeso(modalValue.price)}</p>
            </div>
            <p>{modalValue.description}</p>
          </ModalBody>
        </CustomModal>
      )}
    </div>
  );
};

export default Room;
