import React from "react";
import aboutImg from "/about us.jpg"; // src/assets ফোল্ডারে রাখলে

const AboutUs = () => {
  return (
    <div className="min-h-screen px-4 md:px-8 lg:px-16 flex flex-col items-center justify-start py-12 bg-gray-100 dark:bg-[#0c0e18]">
      {/* Top - Image */}
      <div className="w-full flex justify-center mb-10">
        <img
          src={aboutImg}
          alt="Food Waste Awareness"
          className="w-full max-w-3xl h-auto rounded-2xl shadow-lg object-cover"
        />
      </div>

      {/* Bottom - Text */}
      <div className="bg-white dark:bg-[#1a1c2b] text-center shadow-lg dark:shadow-gray-800 p-8 md:p-10 rounded-2xl max-w-4xl">
        <h1 className="text-3xl lg:text-4xl font-bold text-sky-500 dark:text-secondary mb-4">
          About Our Mission
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
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
