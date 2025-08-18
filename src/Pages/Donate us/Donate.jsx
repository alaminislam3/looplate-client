import React from "react";
import { motion } from "framer-motion";

const Donate = () => {
  return (
    <div className="p-10 px-4 md:px-8 lg:px-16 md:py-20 py-10 flex flex-col items-center bg-gray-100 dark:bg-gray-900">
      {/* Image Section */}
      <div
        className="w-full h-[70vh] bg-cover bg-center relative rounded-xl overflow-hidden shadow-lg"
        style={{
          backgroundImage: `url("https://i.ibb.co/S71zYrK7/food-donation.jpg")`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0  bg-opacity-40"></div>

        {/* Center Content with light black transparent bg */}
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className=" bg-opacity-50 px-6 py-6 md:px-10 md:py-8 rounded-lg max-w-3xl"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Together, We Can Reduce Food Waste
            </h1>
            <p className="text-md md:text-lg lg:text-xl text-white max-w-2xl leading-relaxed">
              Millions of people go hungry while tons of food are wasted every
              day. Your donation can bring hope, food, and happiness to those in
              need.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bottom Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="w-full flex flex-col items-center bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 mt-12 rounded-xl shadow-lg px-6 md:px-12 py-10 max-w-2xl text-center"
      >
        <p className="text-md md:text-lg lg:text-xl mb-6">
          Even a small contribution can make a huge difference. With just{" "}
          <span className="font-bold text-primary">$20</span>, you can provide
          meals and reduce food waste effectively.
        </p>
        <button className="bg-primary  hover:bg-blue-600 dark:bg-ancent dark:hover:bg-indigo-500 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-300">
          Donate $20
        </button>
      </motion.div>
    </div>
  );
};

export default Donate;
