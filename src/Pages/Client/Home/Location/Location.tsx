import { Button } from "@heroui/react";
import { IoLocation } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";

const Location = () => {
  return (
    <div className="mt-20 lg:h-[38rem]">
      <div className="w-full bg-yuma-100 py-20 px-4 flex justify-center lg:absolute lg:left-0 lg:px-10">
        <div className="z-96 lg:max-w-7xl">
          <div className="bg-yuma-50 flex flex-col lg:flex-row">
            <div className="w-full flex flex-col gap-6 p-6 justify-center">
              <h1 className="text-4xl">Location & Maps</h1>
              <p className="flex items-center gap-2 text-base font-light text-gray-600">
                <div className="text-2xl">
                  <IoLocation />
                </div>
                Infinity Hotel – Bonifacio Global City, 28th Street corner 5th
                Avenue Bonifacio Global City, Taguig Metro Manila, Philippines
                1634
              </p>
              <p className="text-base font-light text-gray-600">
                In the heart of BGC, where innovation meets luxury, Infinity
                Hotel rises as a sleek, contemporary haven for urban explorers,
                business travelers, and weekend wanderers. Surrounded by art
                murals, designer boutiques, rooftop bars, and tech hubs, our
                hotel is just a short stroll from High Street, The Mind Museum,
                and premier lifestyle destinations. From our skyline-view suites
                to curated Filipino fusion cuisine, Infinity Hotel – BGC is
                where cosmopolitan comfort finds its edge.
              </p>
              <Button
                size="lg"
                radius="sm"
                className="bg-yuma-400 text-white text-sm w-full lg:w-1/3"
              >
                View Location <FaArrowRightLong />
              </Button>
            </div>
            <div className="w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30954.18420424599!2d121.03075999140895!3d14.55344441606847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c91e457cd0b7%3A0x8f1834d9c7b4fdf6!2sBonifacio%20Global%20City%2C%20Taguig%2C%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1720619930000!5m2!1sen!2sph"
                width="100%"
                height="450"
                style={{ border: 0 }}
                loading="lazy"
                title="Infinity Hotel BGC Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
