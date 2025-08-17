import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen px-4 md:px-8 lg:px-16 flex flex-col items-center justify-start py-12 bg-gray-100">
      {/* Top - Image */}
      <div className="w-full flex justify-center mb-8">
        <img
          src="./about us.jpg" // এখানে আপনার ইমেজ লিংক দিন
          alt="Food Waste Awareness"
          className="w-full max-w-3xl h-auto rounded-2xl shadow-lg object-cover
"
        />
      </div>

      {/* Bottom - Text */}
      <div className="text-center border-amber-50 shadow">
        <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
          About Our Mission
        </h1>
        <p className="text-gray-700 text-lg leading-relaxed">
          Every day, tons of food goes to waste while millions of people suffer
          from hunger. Our Food Waste Reduction Platform is built to connect
          restaurants, charities, and individuals to minimize waste and share
          surplus food with those in need.  
          <br /> <br />
          We believe that small actions—like donating extra meals instead of
          throwing them away—can make a big difference. Together, we can reduce
          food waste, support communities, and create a sustainable future.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
