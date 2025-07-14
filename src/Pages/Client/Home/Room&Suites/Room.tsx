import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "../../../../App.css";
import { Button, Card, CardFooter, Image, Skeleton } from "@heroui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { formatToPeso } from "../../../../helpers/formatToPeso";

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
  const [rooms, setRooms] = useState<any>();
  const [fetching, setFething] = useState<boolean>(false);

  const fetchRoomTypes = async () => {
    setFething(true);
    try {
      const apiUrl = "http://192.168.123.147:8080/api/v1/room-types";
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
  }, []);
  return (
    <div className="border-2 h-[47.5rem]">
      <div className="absolute left-0 bg-[#2E2E2E] w-full flex justify-center py-20 px-15">
        <div className="w-[1440px]">
          {fetching ? (
            <RoomSkeleton />
          ) : (
            <>
              <div className="w-1/2 text-center m-auto flex flex-col gap-4">
                <h1 className="text-white font-light text-5xl">
                  Rooms & Suites
                </h1>
                <p className="text-gray-300 font-light text-base">
                  Modern comfort meets quiet luxury. From cozy deluxe rooms to
                  our signature Infinity Suite, each space is designed for rest,
                  style, and stunning views.
                </p>
              </div>
              <Swiper
                spaceBetween={30}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 50,
                  },
                }}
                className="mt-10"
              >
                {rooms &&
                  rooms.map((room: any) => (
                    <SwiperSlide key={room.id}>
                      <Card isFooterBlurred className="border-none" radius="lg">
                        <Image
                          alt="Woman listing to music"
                          src="https://heroui.com/images/hero-card.jpeg"
                        />
                        <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-lg bottom-1 w-[calc(100%_-_8px)] shadow-sm ml-1 z-10">
                          <p className="text-tiny text-white/80">{room.name}</p>
                          <Button
                            className="text-tiny text-white bg-black/20"
                            color="default"
                            radius="lg"
                            size="sm"
                            variant="flat"
                          >
                            {formatToPeso(room.price)}
                          </Button>
                        </CardFooter>
                      </Card>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Room;
