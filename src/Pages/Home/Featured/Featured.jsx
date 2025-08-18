import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Loading from "../../../Shared/Loading/Loading";
import { motion } from "framer-motion";

const Featured = () => {
  const axiosSecure = UseAxiosSecure();

  const { data: donations = [], isLoading, isError } = useQuery({
    queryKey: ["featured-donations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/fourcard");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <p className="text-center text-red-500 py-10">Something went wrong!</p>
    );

  return (
    <section className="px-4 md:px-8 lg:px-16 md:py-20 py-10 bg-[#f1f3fa] dark:bg-[#0c0e18] transition-colors duration-300">
      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#435cd1] dark:text-[#8c9eee] mb-3">
          Pick from Today’s Specials
        </h2>
        <p className="text-[#0c0e18]/80 dark:text-gray-300 max-w-2xl mx-auto">
          Discover freshly available donations from our partnered restaurants
          and help reduce food waste while making a difference!
        </p>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {donations.map((donation, index) => (
          <motion.div
            key={donation._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="bg-white dark:bg-[#1a1c25] rounded-2xl shadow-md overflow-hidden flex flex-col hover:shadow-xl hover:-translate-y-2 transform transition duration-300"
          >
            {/* Image with hover zoom */}
            <div className="overflow-hidden relative">
              <img
                src={donation.image}
                alt={donation.title}
                className="h-48 w-full object-cover transform hover:scale-110 transition duration-500"
              />
              {/* Overlay badge */}
              <span
                className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full ${
                  donation.status === "Available"
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {donation.status}
              </span>
            </div>

            {/* Card Content */}
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-xl font-semibold mb-2 text-[#0c0e18] dark:text-[#f1f3fa]">
                {donation.food_type}
              </h3>
              <p className="text-[#0c0e18]/80 dark:text-gray-300 mb-1">
                <span className="font-semibold">Restaurant:</span>{" "}
                {donation.restaurant_name}
              </p>
              <p className="text-[#0c0e18]/80 dark:text-gray-300 mb-3">
                <span className="font-semibold">Location:</span>{" "}
                {donation.location}
              </p>

              <Link
                to={`/donation/${donation._id}`}
                className="mt-auto inline-block text-center bg-[#435cd1] dark:bg-[#4d6bf4] text-white px-4 py-2 rounded-lg hover:bg-[#4d6bf4] dark:hover:bg-[#8c9eee] transition"
              >
                View Details
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Featured;
