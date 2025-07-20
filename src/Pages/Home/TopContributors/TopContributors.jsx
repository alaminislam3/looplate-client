import resimg from '../../../assets/Resturent image.jpg'
const TopContributors = () => {
    return (
      <section className=" md:py-20 py-10 px-6 md:px-16">
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Left: Image */}
          
  
          {/* Right: Text */}
          <div className="md:w-1/2 space-y-4">
            <h2 className="text-3xl md:mb-10 md:text-4xl font-bold text-gray-800">
              Hall of Heroes: <br className="hidden md:block" /> Our Monthly Food Saver
            </h2>
            <p className="text-gray-600 text-lg">
              🌟 <strong className='font-bold'>PAT'S JAMAICAN JERK</strong> has been recognized as the top contributor this month! 
              With their generous food donations, they’ve helped prevent over <strong>350 kg</strong> of food waste 
              and supported hundreds of people in need.
            </p>
            <p className="text-gray-700">
              Thank you, Sunrise Bakery, for being a shining example in our community’s mission 
              to reduce waste and feed the hungry. ❤️
            </p>
          </div>

          <div className="md:w-1/2">
            <img
              src={resimg} // Replace with actual restaurant image if available
              alt="Top Donor Restaurant"
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>
    );
  };
  
  export default TopContributors;
  