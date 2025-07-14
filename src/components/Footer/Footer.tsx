import { FaFacebook, FaInstagramSquare, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoIosStar } from "react-icons/io";

const Footer = () => {
  return (
    <div className="h-96 w-full bg-[#2E2E2E] flex flex-col justify-between">
      <div className="flex justify-around items-center text-white h-full">
        <div className="flex flex-col gap-2 w-72 text-center">
          <h1 className="text-lg">Address</h1>
          <p className="text-tiny text-light">
            Infinity Hotel – Bonifacio Global City, 28th Street corner 5th
            Avenue Bonifacio Global City, Taguig Metro Manila, Philippines 1634
          </p>
        </div>
        <div className="flex flex-col items-center w-72 gap-6">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl">INFINITY</h1>
            <div className="flex flex-row gap-3 text-[#fff220]">
              {[...Array(5)].map((_, index) => (
                <IoIosStar key={index} size={10} />
              ))}
            </div>
          </div>
          <div className="flex gap-4 text-white text-lg">
            <FaFacebook />
            <FaInstagramSquare />
            <FaXTwitter />
            <FaYoutube />
          </div>
        </div>
        <div className="w-72 flex flex-col gap-2">
          <h1 className="text-lg text-center">Contact Us</h1>
          <div className="text-tiny text-center">
            <p>+63 912 345 6789</p>
            <p>ry.dev@infinity.com.ph</p>
          </div>
        </div>
      </div>
      <div className="p-5 bg-[#232323]">
        <h1 className="text-center text-white text-sm font-light">
          Designed & Developed by Ryan Mark Delos Reyes
        </h1>
      </div>
    </div>
  );
};

export default Footer;
