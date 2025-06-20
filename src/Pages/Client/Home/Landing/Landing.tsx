import LandingImage from "@/assets/images/front-image.jpg";
import { IoIosStar } from "react-icons/io";
import { PrimaryButton } from "../../../../components/Buttons/Button";
const Landing = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="absolute top-0 left-0 w-full z-[-1]">
        <img
          src={LandingImage}
          alt="Landing Page"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40" />
      </div>

      <div className="flex flex-col justify-center items-center gap-4 h-[45rem]">
        <div className="flex flex-row gap-3 text-[#fff220]">
          {[...Array(5)].map((_, index) => (
            <IoIosStar key={index} size={20} />
          ))}
        </div>
        <div className="flex flex-col items-center gap-2 font-semibold text-white">
          <h1 className="text-2xl">THIS IS INFINITY HOTEL</h1>
          <h1 className="text-6xl">THE BEST LUXURY HOTEL</h1>
          <h1 className="text-6xl">IN MANILA</h1>
        </div>
        <div className="mt-12">
          <PrimaryButton>View Rooms</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default Landing;
