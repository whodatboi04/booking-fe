import { HashLink } from "react-router-hash-link";
import { Navlinks } from "./Navlinks";
import Logo from "@/assets/images/infinity.png";
import { PrimaryButton } from "../Buttons/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NavItems = () => {
  return (
    <ul className="flex gap-20">
      {Navlinks.map((item) => (
        <li key={item.id}>
          <HashLink
            to={item.href}
            className=" text-white hover:text-gray-300 transition duration-300 ease-in-out "
          >
            {item.title}
          </HashLink>
        </li>
      ))}
    </ul>
  );
};

const Navbar = () => {
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
        console.log(response.data.data);
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const fullName = `${user?.firstname ?? ""} ${user?.lastname ?? ""}`;

  return (
    <header className="max-w-full flex justify-between items-center py-4 px-12">
      <img src={Logo} alt="Logo" className="w-24" />
      <nav>
        <NavItems />
      </nav>
      <div className="">
        {userToken ? (
          <div className="text-white w-24">
            {fullName ?? <div className="w-full"></div>}
          </div>
        ) : (
          <PrimaryButton onClick={() => navigate("/login")}>
            Book Now
          </PrimaryButton>
        )}
      </div>
    </header>
  );
};

export default Navbar;
