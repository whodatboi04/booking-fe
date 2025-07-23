import { FaCar, FaSwimmingPool, FaWifi } from "react-icons/fa";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { IoFlowerSharp } from "react-icons/io5";
import { CgGym } from "react-icons/cg";

const Services = () => {
  const services = [
    {
      id: 1,
      logo: <FaWifi className="text-yuma-400" size={40} />,
      title: "High Speed Wifi",
      description:
        "Seamless, secure, and fast — stay connected wherever you are in the hotel.",
    },
    {
      id: 2,
      logo: <FaCar className="text-yuma-400" size={40} />,
      title: "Parking Space",
      description:
        "Secure on-site parking available for all guests, 24/7 access.",
    },
    {
      id: 3,
      logo: <FaSwimmingPool className="text-yuma-400" size={40} />,
      title: "Swimming pool",
      description:
        "Seamless, secure, and fast — stay connected wherever you are in the hotel.",
    },
    {
      id: 4,
      logo: <GiForkKnifeSpoon className="text-yuma-400" size={40} />,
      title: "Restaurant & Bar",
      description:
        "Seamless, secure, and fast — stay connected wherever you are in the hotel.",
    },
    {
      id: 5,
      logo: <IoFlowerSharp className="text-yuma-400" size={40} />,
      title: "Spa Center",
      description:
        "Seamless, secure, and fast — stay connected wherever you are in the hotel.",
    },
    {
      id: 6,
      logo: <CgGym className="text-yuma-400" size={40} />,
      title: "Fitness Center",
      description:
        "Seamless, secure, and fast — stay connected wherever you are in the hotel.",
    },
  ];
  return (
    <div className="flex flex-col items-center gap-10 m-20 w-full p-4">
      <div className="w-full text-center flex flex-col gap-4  lg:w-1/2 ">
        <h1 className="text-3xl lg:text-5xl font-light">
          Facilities & Services
        </h1>
        <p className="text-sm font-light lg:text-base">
          Enjoy world-class amenities, including a rooftop pool, full-service
          spa, fitness center, and 24/7 concierge — all tailored for your
          comfort and convenience.
        </p>
      </div>
      <div className="grid  gap-4 lg:grid-cols-3">
        {services.map((service: any) => (
          <div key={service.id}>
            <div className="flex items-center gap-4">
              <div>{service.logo}</div>
              <div className="flex flex-col gap-2 p-5">
                <div className="text-2xl font-light ">{service.title}</div>
                <div className="font-light text-gray-700">
                  {service.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
