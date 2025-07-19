import bannerimg from "../../../assets/banner.jpg"
const Banner = () => {
    return (
      <div className="relative h-[80vh] w-full">
        {/* Background Image */}
        <img
          src={bannerimg}
          alt="Banner Image"
          className="w-full h-full object-cover"
        />
  
        {/* Overlay */}
        <div className="absolute inset-0  bg-opacity-60 flex items-center justify-center text-center px-4">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-snug">
              Join Us in <span className="text-primary">Reducing Food Waste</span>
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white">
              Your small contribution can make a big impact on someone’s life.
            </p>
            <button className="mt-6 bg-primary text-white px-6 py-3 rounded-xl font-semibold">
              Donate Now
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Banner;
  