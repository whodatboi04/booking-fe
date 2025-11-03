import Landing from "./Landing";
import About from "./About";
import Location from "./Location";
import Room from "./Room&Suites";
import Services from "./Facilities&Services";
import Footer from "../../../components/Footer";
import RoomTypeContextProvider from "../../../contexts/roomTypeContext";

const Home = () => {
  return (
    <div>
      <section className="max-w-7xl mx-auto flex flex-col items-center">
        <RoomTypeContextProvider>
          <Landing />
        </RoomTypeContextProvider>
        <About />
        <Location />
        <Room />
        <Services />
      </section>
    </div>
  );
};

export default Home;
