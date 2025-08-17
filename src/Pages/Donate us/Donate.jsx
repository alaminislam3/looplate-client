import React from "react";


const Donate = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      {/* Image Section */}
      <div
        className="w-full h-[70vh] bg-cover bg-center relative"
        style={{
          backgroundImage: `url("https://i.ibb.co.com/S71zYrK7/food-donation.jpg")`, // আপনার ইমেজ দিন
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-opacity-40"></div>

        {/* Center Content with light black transparent bg */}
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-6">
          <div className=" bg-opacity-50 px-6 py-4 rounded-md">
            <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4">
              Together, We Can Reduce Food Waste
            </h1>
            <p className="text-lg lg:text-xl text-white max-w-2xl leading-relaxed">
              Millions of people go hungry while tons of food are wasted every
              day. Your donation can bring hope, food, and happiness to those in
              need.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section (Below Image) */}
      <div className="w-full flex flex-col items-center px-6 py-12 bg-white text-gray-800">
        <p className="text-md lg:text-lg mb-4 max-w-xl text-center">
          Even a small contribution can make a huge difference. With just{" "}
          <span className="font-bold text-primary">$20</span>, you can provide
          meals and reduce food waste effectively.
        </p>
       <button className="btn btn-primary p-5">$20</button>   
      </div>
    </div>
  );
};

export default Donate;
