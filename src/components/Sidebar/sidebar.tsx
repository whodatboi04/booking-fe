import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { bottomLinks, sideLinks } from "./sideLinks";
import { HashLink } from "react-router-hash-link";
import Logo from "@/assets/images/hotel-logo.svg";
import { useEffect, useState } from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const SidebarItems = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className="flex flex-col justify-between h-full p-2">
      <ul>
        {sideLinks.map((i) => (
          <li key={i.id} className="p-1">
            <HashLink
              to={i.href}
              className={`flex items-center ${
                !isOpen && "justify-center"
              } gap-2 text-sm px-4 py-3 rounded-lg hover:bg-yuma-400 hover:text-white active:bg-yuma-500 transition`}
            >
              <span className="text-lg">{i.icon}</span>
              {isOpen && <span>{i.title}</span>}
            </HashLink>
          </li>
        ))}
      </ul>

      <ul className="mt-2">
        {bottomLinks.map((i) => (
          <li key={i.id} className="p-2">
            <HashLink
              to={i.href}
              className={`flex items-center ${
                !isOpen && "justify-center"
              } gap-2 text-sm px-4 py-3 rounded-lg hover:bg-yuma-400 hover:text-white active:bg-yuma-500 transition`}
            >
              <span className="text-lg">{i.icon}</span>
              {isOpen && <span>{i.title}</span>}
            </HashLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

const sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleButton = () => {
    setIsOpen(!isOpen);
  };

  const isMobile = useMediaQuery("(max-width: 768px)");
  useEffect(() => {
    isMobile ? setIsOpen(false) : setIsOpen(true);
  }, [isMobile]);

  return (
    <>
      <aside
        className={`h-screen bg-yuma-50 flex flex-col transition-all duration-300 ${
          isOpen ? "min-w-64" : "min-w-20"
        }`}
      >
        <div className="relative flex items-center p-4 gap-2 transition-all duration-300">
          <img
            src={Logo}
            alt="Logo"
            className={`${isOpen ? "w-16" : "w-12"}`}
          />
          {isOpen && <h1 className="font-bold text-sm">INFINITY HOTEL</h1>}
          <div className="absolute end-[-0.5rem]">
            <button
              onClick={toggleButton}
              className="border-1 border-gray-400 rounded-full p-1"
            >
              {isOpen ? (
                <FaChevronLeft size={10} />
              ) : (
                <FaChevronRight size={10} />
              )}
            </button>
          </div>
        </div>
        <SidebarItems isOpen={isOpen} />
      </aside>
    </>
  );
};

export default sidebar;
