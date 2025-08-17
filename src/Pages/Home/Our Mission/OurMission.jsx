import React from "react";
import { FaUtensils, FaTshirt, FaBook, FaHeartbeat, FaHome, FaWater } from "react-icons/fa";

const missions = [
  {
    icon: <FaUtensils className="text-green-600 text-4xl mb-4" />,
    title: "Charity For Food",
    description:
      "This level of development and supervision is for individuals who can't live without anyone else's input yet who.",
  },
  {
    icon: <FaTshirt className="text-blue-600 text-4xl mb-4" />,
    title: "Charity For Cloth",
    description:
      "This level of development and supervision is for individuals who can't live without anyone else's input yet who.",
  },
  {
    icon: <FaBook className="text-yellow-600 text-4xl mb-4" />,
    title: "Charity For Education",
    description:
      "This level of development and supervision is for individuals who can't live without anyone else's input yet who.",
  },
  {
    icon: <FaHeartbeat className="text-red-600 text-4xl mb-4" />,
    title: "Charity For Health",
    description:
      "This level of development and supervision is for individuals who can't live without anyone else's input yet who.",
  },
  {
    icon: <FaHome className="text-purple-600 text-4xl mb-4" />,
    title: "Charity For Shelter",
    description:
      "This level of development and supervision is for individuals who can't live without anyone else's input yet who.",
  },
  {
    icon: <FaWater className="text-cyan-600 text-4xl mb-4" />,
    title: "Charity For Clean Water",
    description:
      "This level of development and supervision is for individuals who can't live without anyone else's input yet who.",
  },
];

const OurMission = () => {
  return (
    <section className=" bg-gray-100">
     <div className="px-4 md:px-8 lg:px-16 md:py-20 py-10">
     <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Our Mission</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Your Attention Is Changed The Part Of World. Give a helping hand to those who need it!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 mx-auto">
        {missions.map((mission, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-6 shadow hover:shadow-2xl hover:p-5 transition-shadow duration-300 text-center"
          >
            {mission.icon}
            <h3 className="text-xl font-semibold mb-2">{mission.title}</h3>
            <p className="text-gray-600">{mission.description}</p>
          </div>
        ))}
      </div>
     </div>
    </section>
  );
};

export default OurMission;
