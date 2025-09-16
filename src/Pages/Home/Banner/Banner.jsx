import { Link } from "react-router";
import bannerimg from "../../../../public/poor boy.jpg";

const Banner = () => {
  return (
    <div
      className="relative w-full h-[80vh] bg-center bg-cover"
      style={{ backgroundImage: `url(${bannerimg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0  bg-opacity-60 flex items-center px-6 md:px-12 lg:px-20">
        <div className="text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-snug">
            Join Us in <br /> Reducing Food Waste
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-white max-w-xl">
            Your small contribution can make a big impact on someone’s life.
          </p>
          <Link to={"/donate"}>
            <button className="mt-6 bg-sky-500 btn border-none  cursor-pointer text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition duration-300">
              Donate Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
