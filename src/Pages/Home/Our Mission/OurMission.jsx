import React from "react";
import {
  FaUtensils,
  FaTshirt,
  FaBook,
  FaHeartbeat,
  FaHome,
  FaWater,
} from "react-icons/fa";

const missions = [
  {
    icon: <FaUtensils className="text-[#435cd1] text-4xl mb-4" />,
    title: "Charity For Food",
    description:
      "This level of development and supervision is for individuals who can't live without anyone else's input yet who.",
  },
  {
    icon: <FaTshirt className="text-[#8c9eee] text-4xl mb-4" />,
    title: "Charity For Cloth",
    description:
      "This level of development and supervision is for individuals who can't live without anyone else's input yet who.",
  },
  {
    icon: <FaBook className="text-[#4d6bf4] text-4xl mb-4" />,
    title: "Charity For Education",
    description:
      "This level of development and supervision is for individuals who can't live without anyone else's input yet who.",
  },
  {
    icon: <FaHeartbeat className="text-red-500 text-4xl mb-4" />,
    title: "Charity For Health",
    description:
      "This level of development and supervision is for individuals who can't live without anyone else's input yet who.",
  },
  {
    icon: <FaHome className="text-purple-500 text-4xl mb-4" />,
    title: "Charity For Shelter",
    description:
      "This level of development and supervision is for individuals who can't live without anyone else's input yet who.",
  },
  {
    icon: <FaWater className="text-cyan-500 text-4xl mb-4" />,
    title: "Charity For Clean Water",
    description:
      "This level of development and supervision is for individuals who can't live without anyone else's input yet who.",
  },
];

const OurMission = () => {
  return (
    <section className="bg-[#f1f3fa] dark:bg-[#0c0e18] transition-colors duration-300">
      <div className="px-4 md:px-8 lg:px-16 md:py-20 py-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#435cd1] dark:text-[#8c9eee]">
            Our Mission
          </h2>
          <p className="text-lg text-[#0c0e18]/80 dark:text-gray-300 max-w-2xl mx-auto">
            Your Attention Is Changed The Part Of World. Give a helping hand to
            those who need it!
          </p>
        </div>

        {/* Mission Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 mx-auto">
          {missions.map((mission, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[#1a1c25] rounded-lg p-6 shadow hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-center"
            >
              {mission.icon}
              <h3 className="text-xl font-semibold mb-2 text-[#0c0e18] dark:text-[#f1f3fa]">
                {mission.title}
              </h3>
              <p className="text-[#0c0e18]/70 dark:text-gray-400">
                {mission.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurMission;
