import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const ImpactOverview = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // একবারই animate হবে
    threshold: 0.2, // ২০% দেখা গেলেই trigger হবে
  });

  const stats = [
    {
      id: 1,
      emoji: "🍞",
      title: "Total Food Donated",
      number: 3500,
      suffix: " kg",
      desc: "Across all partner restaurants",
      bg: "bg-[#F0FDF4]",
      color: "text-green-600",
    },
    {
      id: 2,
      emoji: "👨‍👩‍👧‍👦",
      title: "People Fed",
      number: 12000,
      suffix: "+",
      desc: "Families and individuals helped",
      bg: "bg-[#EFF6FF]",
      color: "text-blue-600",
    },
    {
      id: 3,
      emoji: "🌍",
      title: "CO₂ Prevented",
      number: 1.2,
      suffix: " Tons",
      desc: "Less food waste, cleaner air",
      bg: "bg-[#FEF3C7]",
      color: "text-yellow-700",
      decimals: 1, // দশমিক দেখানোর জন্য
    },
    {
      id: 4,
      emoji: "🏆",
      title: "Active Partners",
      number: 85,
      suffix: "+",
      desc: "Restaurants, charities, and volunteers",
      bg: "bg-[#F3E8FF]",
      color: "text-purple-700",
    },
  ];

  return (
    <section ref={ref} className="md:py-20 py-10 px-6 md:px-16 bg-gray-50">
      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
        Together, We're Making a Difference
      </h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className={`${stat.bg} p-6 rounded-2xl shadow-md`}
          >
            <div className="text-5xl mb-2">{stat.emoji}</div>
            <h3 className="text-xl font-semibold text-gray-800">
              {stat.title}
            </h3>
            <p className={`text-3xl font-bold mt-2 ${stat.color}`}>
              {inView && (
                <CountUp
                  end={stat.number}
                  duration={2.5}
                  decimals={stat.decimals || 0}
                />
              )}
              {stat.suffix}
            </p>
            <p className="text-gray-600 mt-1 text-sm">{stat.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ImpactOverview;
