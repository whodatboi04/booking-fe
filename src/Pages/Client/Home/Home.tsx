import Landing from "./Landing";
import Amenities from "./Amenities";
import BookingContextProvider from "../../../contexts/BookingContext";

const Home = () => {
  return (
    <div>
      <BookingContextProvider>
        <section className="max-w-screen flex flex-col items-center px-24">
          <div className="w-[1440px]">
            <Landing />
            <Amenities />
          </div>
        </section>
      </BookingContextProvider>
    </div>
  );
};

export default Home;
