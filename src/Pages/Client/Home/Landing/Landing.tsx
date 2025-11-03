import LandingImage from "@/assets/images/front-image.jpg";
import { IoIosStar } from "react-icons/io";
import BookingFilter from "../BookingFilter";
const Landing = () => {
  return (
    <>
      <div className="absolute bottom-10 top-0 left-0 z-[-1] h-[55rem] w-full">
        <img
          src={LandingImage}
          alt="Landing Page"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40" />
      </div>

      <div className="w-full">
        <div className="flex flex-col items-center gap-12 py-32">
          <div className="flex flex-row gap-3 text-[#fff220] text-tiny lg:text-xl">
            {[...Array(5)].map((_, index) => (
              <IoIosStar key={index} />
            ))}
          </div>
          <div className="flex flex-col items-center gap-2 font-semibold text-white">
            <h1 className="text-sm lg:text-2xl">THIS IS INFINITY HOTEL</h1>
            <h1 className="text-3xl lg:text-6xl">THE BEST LUXURY HOTEL</h1>
            <h1 className="text-3xl lg:text-6xl">IN MANILA</h1>
          </div>
        </div>
        <BookingFilter />
      </div>
    </>
  );
};

export default Landing;
