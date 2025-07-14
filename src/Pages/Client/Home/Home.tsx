import Landing from "./Landing";
import About from "./About";
import BookingContextProvider from "../../../contexts/BookingContext";
import Location from "./Location";
import Room from "./Room&Suites";
import Services from "./Facilities&Services";
import Footer from "../../../components/Footer";

const Home = () => {
  return (
    <div>
      <BookingContextProvider>
        <section className="max-w-screen flex flex-col items-center">
          <div className="w-[1440px]">
            <Landing />
            <About />
            <Location />
            <Room />
            <Services />
          </div>
          <Footer />
        </section>
      </BookingContextProvider>
    </div>
  );
};

export default Home;
