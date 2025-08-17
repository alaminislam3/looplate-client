import { Link } from "react-router";
import { FaBan, FaUtensils } from "react-icons/fa";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md bg-white shadow-xl rounded-2xl p-10 space-y-6 border border-gray-100"
      >
        {/* Icon */}
        <div className="flex justify-center items-center space-x-3">
          <FaBan className="text-red-500 text-6xl" />
          <FaUtensils className="text-orange-400 text-5xl" />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-error">403 Forbidden</h1>
        <p className="text-gray-600">
          Oops! Looks like your plate is empty 🍽️<br />
          You don’t have permission to access this page.
        </p>

        {/* Button */}
        <Link
          to="/"
          className="btn bg-primary text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition"
        >
          Go Back Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
