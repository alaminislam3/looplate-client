import React from 'react';
import { GiMeal } from 'react-icons/gi';

const Logo = () => {
  return (
    <div className="flex items-center space-x-2 p-2 rounded-xl  ">
      <div className="relative">
        {/* Plate icon */}
        <GiMeal className="text-4xl text-gray-500" />
        {/* Recycle icon on top */}
        
      </div>
      {/* Brand Name */}
      <h1 className="text-2xl font-bold text-neutral">
        <span className="text-sky-400">Looplate</span>
        
      </h1>
    </div>
  );
};

export default Logo;
