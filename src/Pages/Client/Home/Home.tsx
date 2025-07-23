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
        <section className="max-w-7xl mx-auto flex flex-col items-center">
          <Landing />
          <About />
          <Location />
          <Room />
          <Services />
        </section>
        <Footer />
      </BookingContextProvider>
    </div>
  );
};

export default Home;
