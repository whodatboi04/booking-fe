import { HashLink } from "react-router-hash-link";
import { Navlinks } from "./Navlinks";
import Logo from "@/assets/images/hotel-logo.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@heroui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  FaFacebook,
  FaInstagramSquare,
  FaTimes,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const NavItems = () => {
  return (
    <ul className="flex flex-col gap-12 text-center p-24 pb-14  lg:flex-row lg:gap-20 lg:p-10">
      {Navlinks.map((item) => (
        <li key={item.id}>
          <HashLink
            to={item.href}
            className=" text-black font-semibold lg:text-white"
          >
            {item.title}
          </HashLink>
        </li>
      ))}
    </ul>
  );
};

const BookButton = () => {
  const [user, setUser] = useState<any>({});
  const [userToken, setUserToken] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const apiUrl = "http://192.168.123.147:8080/api/auth/getUser";
      const token = localStorage.getItem("token");

      if (token) {
        setUserToken(token);
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.data);
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser();
    }
  }, []);

  const fullName = `${user?.firstname ?? ""} ${user?.lastname ?? ""}`;

  return (
    <>
      {userToken ? (
        <div className="text-white w-24">
          {fullName ?? <div className="w-full"></div>}
        </div>
      ) : (
        <Button
          onPress={() => navigate("/login")}
          className="bg-yuma-300 px-10 w-64 lg:w-36"
          radius="sm"
        >
          <span className="text-white">Book Now</span>
        </Button>
      )}
    </>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="max-w-full flex justify-between items-center py-8 px-8 lg:px-12">
      {/* Desktop View */}
      <img src={Logo} alt="Logo" className="w-24" />
      <nav className="hidden lg:flex">
        <NavItems />
      </nav>

      {/* Mobile View */}
      <div className="text-white lg:hidden">
        <div>
          <button onClick={toggleMenu}>
            {!isOpen && <GiHamburgerMenu size={20} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="fixed bg-white top-0 left-0 w-screen h-screen overflow-hidden z-50 lg:hidden">
          <div className="w-full h-full">
            <div className=" flex justify-between py-8 px-8">
              <img src={Logo} alt="Logo" className="w-10" />
              <h1 className="text-2xl text-black font-bold">INFINITY</h1>
              <button onClick={toggleMenu}>
                {isOpen && <FaTimes size={20} className="text-yuma-500" />}
              </button>
            </div>
            <div className="flex flex-col">
              <NavItems />
            </div>
            <div className="text-black flex justify-center text-xl gap-4 p-5">
              <FaFacebook />
              <FaInstagramSquare />
              <FaXTwitter />
              <FaYoutube />
            </div>
            <div className="flex justify-center">
              <BookButton />
            </div>
          </div>
        </div>
      )}

      <div className="hidden lg:flex">
        <BookButton />
      </div>
    </header>
  );
};

export default Navbar;
