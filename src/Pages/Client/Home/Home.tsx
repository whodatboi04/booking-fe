import Landing from "./Landing";
import Amenities from "./Amenities";
import Navbar from "../../../components/Navbar";
import BookingFilter from "./BookingFilter";

const Home = () => {
  return (
    <div>
      <section className="max-w-screen flex flex-col items-center px-24">
        <div className="w-[1440px]">
          <Landing />
          <BookingFilter />
          <Amenities />
        </div>
      </section>
    </div>
  );
};

export default Home;
