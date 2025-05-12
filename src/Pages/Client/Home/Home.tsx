import LandingImage from '@/assets/images/front-image.jpg'

const Home = () => {
  return (
    <div>
        <div className="absolute top-0 left-0 w-full h-full z-[-1]">
        <img
            src={LandingImage}
            alt="Landing Page"
            className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40" />
        </div>

    </div>
  )
}

export default Home
