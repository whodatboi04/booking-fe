import RoomPhoto from "@/assets/images/front-hotel-room.jpg";
import RoomPhoto2 from "@/assets/images/front-hotel-room-2.jpg";

const About = () => {
  return (
    <div className="flex flex-col-reverse mt-20 lg:mt-15 p-5 lg:flex-row lg:py-24 gap-8">
      <div className="flex flex-col w-full gap-4 lg:flex-row lg:gap-6 justify-center">
        <div className="h-[25rem]">
          <img
            src={RoomPhoto}
            className="w-full lg:w-80 h-full rounded-lg"
            alt=""
          />
        </div>
        <div className="h-[25rem]">
          <img
            src={RoomPhoto2}
            className="w-full lg:w-80 h-full rounded-lg lg:mt-16"
            alt=""
          />
        </div>
      </div>
      <div className="w-full flex items-center">
        <div className="flex flex-col gap-6">
          <h3 className="font-light text-xl text-gray-500 lg:text-2xl">
            Welcome to
          </h3>
          <h1 className="text-3xl lg:text-5xl">Infinity Hotel</h1>
          <p className="text-gray-500 font-light lg:text-lg">
            Where timeless elegance meets infinite comfort. Nestled in the heart
            of serenity, Infinity Hotel offers a luxurious escape designed to
            awaken your senses and soothe your soul. Whether you're here for a
            weekend getaway, a business retreat, or a journey of self-discovery,
            every moment is tailored to exceed your expectations. From our
            sun-drenched suites with panoramic views to our curated dining
            experiences, everything at Infinity is crafted to feel
            infinite—endless relaxation, unforgettable hospitality, and memories
            that last forever. Discover the Infinite. Stay Inspired.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
