import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Loading from "../../Shared/Loading/Loading";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { motion } from "framer-motion";

const AllDonations = () => {
  const axiosSecure = UseAxiosSecure();

  const { data: donations = [], isLoading, isError } = useQuery({
    queryKey: ["verifiedDonations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donations?status=Verified");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <p className="text-center py-10 text-red-500">
        Failed to load donations.
      </p>
    );

  return (
    <div className="p-4 px-4 md:px-8 lg:px-16 md:py-20 py-10">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-primary mb-8 md:mb-10">
        Verified Donations
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {donations.map((donation, index) => (
          <motion.div
            key={donation._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(0,0,0,0.15)" }}
            className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col text-sm md:text-base lg:text-sm"
          >
            {/* Image */}
            <div className="overflow-hidden">
              <img
                src={donation.image}
                alt={donation.title}
                className="w-full h-40 md:h-48 lg:h-80 object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>

            {/* Content */}
            <div className="p-4 md:p-5 lg:p-3 flex-1 flex flex-col justify-between space-y-2">
              <div className="space-y-1">
                <h2 className="text-lg md:text-xl lg:text-base font-semibold text-gray-800 truncate">
                  {donation.title}
                </h2>

                <p className="text-gray-600 truncate">
                  <strong>Restaurant:</strong> {donation.restaurant_name}
                </p>
                <p className="text-gray-600 truncate">
                  <strong>Location:</strong> {donation.location}
                </p>
                <p className="text-gray-600 truncate">
                  <strong>Charity:</strong>{" "}
                  {donation.charityName ? donation.charityName : "Not Assigned Yet"}
                </p>

                <p className="text-gray-600">
                  <strong>Quantity:</strong> {donation.quantity}
                </p>

                <span
                  className={`inline-block mt-1 px-2 py-1 rounded-full text-xs md:text-sm font-medium ${
                    donation.status === "Verified"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {donation.status}
                </span>
              </div>

              <Link
                to={`/donation-details/${donation._id}`}
                className="mt-3 md:mt-4 inline-block text-center bg-primary text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg font-semibold hover:bg-blue-600 transition text-xs md:text-sm"
              >
                View Details
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AllDonations;
