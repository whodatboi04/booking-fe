import RoomPhoto from "@/assets/images/front-hotel-room.jpg";
import RoomPhoto2 from "@/assets/images/front-hotel-room-2.jpg";

const About = () => {
  return (
    <div className=" mt-20 flex gap-8">
      <div className="flex gap-6 w-[50%] justify-center">
        <div className="h-[25]">
          <img src={RoomPhoto} className="w-80 h-full" alt="" />
        </div>
        <div className="h-[25rem]">
          <img src={RoomPhoto2} className="w-80 h-full mt-16" alt="" />
        </div>
      </div>
      <div className="w-[50%] flex items-center">
        <div className="flex flex-col gap-6">
          <h3 className="font-light text-2xl text-gray-500">Welcome to</h3>
          <h1 className="text-5xl">Infinity Hotel</h1>
          <p className="text-gray-500 text-lg font-light">
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
