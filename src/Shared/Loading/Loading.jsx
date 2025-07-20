import React from "react";
import { GiMeal } from "react-icons/gi";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6">
      {/* Animated Circle */}
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Spinning border circle */}
        <div className="absolute w-full h-full rounded-full border-4 border-dashed border-sky-400 animate-spin" />
        
        {/* Centered Logo */}
        <div className="flex items-center space-x-2 p-2 rounded-xl z-10 bg-white">
          <GiMeal className="text-4xl text-gray-500" />
          <h1 className="text-2xl font-bold text-neutral">
            <span className="text-sky-400">Looplate</span>
          </h1>
        </div>
      </div>

      
    </div>
  );
};

export default Loading;
