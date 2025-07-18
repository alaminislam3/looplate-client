import React from 'react';
import { GiMeal } from 'react-icons/gi';

const Logo = () => {
  return (
    <div className="flex items-center space-x-2 p-2 rounded-xl  bg-base-100">
      <div className="relative">
        {/* Plate icon */}
        <GiMeal className="text-4xl text-primary" />
        {/* Recycle icon on top */}
        
      </div>
      {/* Brand Name */}
      <h1 className="text-2xl font-bold text-neutral">
        <span className="text-primary">Loop</span>
        <span className="text-success">late</span>
      </h1>
    </div>
  );
};

export default Logo;
