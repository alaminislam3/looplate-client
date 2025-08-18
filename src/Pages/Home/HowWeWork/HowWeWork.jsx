import { FaHandshake, FaWallet, FaBoxOpen, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";

const steps = [
  {
    id: 1,
    title: "Identify the Need",
    desc: "To inform and engage potential donors and supporters about the charity’s and the cause it supports.",
    icon: <FaHandshake className="w-10 h-10 text-sky-500" />,
  },
  {
    id: 2,
    title: "Plan the Program",
    desc: "To inform and engage potential donors and supporters about the charity’s and the cause it supports.",
    icon: <FaWallet className="w-10 h-10 text-sky-500" />,
  },
  {
    id: 3,
    title: "Deliver the Help",
    desc: "To inform and engage potential donors and supporters about the charity’s and the cause it supports.",
    icon: <FaBoxOpen className="w-10 h-10 text-sky-500" />,
  },
  {
    id: 4,
    title: "Monitor & Grow",
    desc: "To inform and engage potential donors and supporters about the charity’s and the cause it supports.",
    icon: <FaHeart className="w-10 h-10 text-sky-500" />,
  },
];

const HowWeWork = () => {
  return (
    <section className="relative px-4 md:px-8 lg:px-16 md:py-20 py-10 overflow-hidden bg-[#f1f3fa] dark:bg-[#0c0e18]">
      {/* Heading */}
      <div className="text-center mb-12">
        <p className="text-[#435cd1] dark:text-[#8c9eee] text-5xl">Work Process</p>
        <h2 className="text-3xl md:text-4xl text-[#0c0e18]/80 dark:text-gray-300">
          How We Proceed with Donations
        </h2>
      </div>

      {/* Steps */}
      <div className="relative flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20 px-6  mx-auto">
        {steps.map((step) => (
          <div
            key={step.id}
            className="flex flex-col items-center text-center p-10"
          >
            {/* Number */}
            <div className="mb-4">
              <span className="bg-white shadow-md text-gray-900  rounded-md font-bold">
                {String(step.id).padStart(2, "0")}
              </span>
            </div>

            {/* Icon */}
            <div className="w-24 h-24 flex items-center justify-center bg-white shadow-md rounded-2xl rotate-45 mb-4">
              <div className="-rotate-45">{step.icon}</div>
            </div>

            {/* Text */}
            <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
            <p className="text-sm text-gray-600">{step.desc}</p>
          </div>
        ))}
      </div>

      {/* Animated Hands (Right Side) */}
      <div className="absolute top-20 right-0 md:right-1 gap-2">
      <motion.img
          src="/male hand.png"
          alt="Hand"
          className="w-20 md:w-40 opacity-70"
          animate={{ x: [-20, 0, -20] }}
          transition={{ repeat: Infinity, duration: 4 }}
        />
        <motion.img
          src="/female hand.png"
          alt="Hand"
          className="w-20 md:w-40 opacity-70"
          animate={{ x: [-25, 0, -25] }}
          transition={{ repeat: Infinity, duration: 5 }}
        />
      </div>
    </section>
  );
};

export default HowWeWork;
