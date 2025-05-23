import LandingImage from "@/assets/images/front-image.jpg";
import { IoIosStar } from "react-icons/io";

const Home = () => {
  return (
    <div>
      <div className="absolute top-0 left-0 w-full h-full z-[-1]">
        <img
          src={LandingImage}
          alt="Landing Page"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40" />
      </div>

      <div className="flex flex-col justify-center items-center gap-4 h-[45rem]">
        <div className="flex flex-row gap-3 text-[#fff220]">
          <IoIosStar size={20} />
          <IoIosStar size={20} />
          <IoIosStar size={20} />
          <IoIosStar size={20} />
          <IoIosStar size={20} />
        </div>
        <div className="flex flex-col gap-2 font-semibold text-white">
          <h1 className="text-2xl">THIS IS INFINITY HOTEL</h1>
          <h1 className="text-6xl">THE BEST LUXURY HOTEL</h1>
          <h1 className="text-6xl">IN MANILA</h1>
        </div>
        <button>View Rooms</button>
      </div>
    </div>
  );
};

export default Home;
