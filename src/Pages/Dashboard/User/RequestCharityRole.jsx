import { useState } from "react";
import { FaBuilding, FaUser, FaEnvelope, FaFlag } from "react-icons/fa";
import { motion } from "framer-motion";
import CheckoutForm from "../Stripe/CheckOutForm";
import StripeProvider from "../Stripe/StripeProvider";
import UseAuth from "../../../Hooks/UseAuth";

const RequestCharityRole = () => {
  const { user } = UseAuth();
  const [orgName, setOrgName] = useState("");
  const [mission, setMission] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className=" mx-auto p-6 bg-white shadow-2xl rounded-2xl mt-10"
    >
      {/* Title */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Request Charity Role
      </h2>

      {/* Form */}
      <div className="space-y-5 px-10">
        {/* User Name */}
        <div className="flex items-center gap-3">
          <FaUser className="text-sky-500 text-xl" />
          <input
            value={user?.displayName}
            readOnly
            className="input input-bordered w-full text-gray-700 font-medium"
          />
        </div>

        {/* User Email */}
        <div className="flex items-center gap-3">
          <FaEnvelope className="text-sky-500 text-xl" />
          <input
            value={user?.email}
            readOnly
            className="input input-bordered w-full text-gray-700 font-medium"
          />
        </div>

        {/* Organization Name */}
        <div className="flex items-center gap-3">
          <FaBuilding className="text-sky-500 text-xl" />
          <input
            type="text"
            placeholder="Enter Organization Name"
            className="input input-bordered w-full"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            required
          />
        </div>

        {/* Mission Statement */}
        <div className="flex items-start gap-3">
          <FaFlag className="text-sky-500 text-xl mt-2" />
          <textarea
            placeholder="Write your mission statement..."
            className="textarea textarea-bordered w-full"
            rows="5"
            value={mission}
            onChange={(e) => setMission(e.target.value)}
            required
          />
        </div>
      </div>

      {/* Stripe Checkout */}
      <div className="mt-8">
        <StripeProvider>
          <CheckoutForm user={user} orgName={orgName} mission={mission} />
        </StripeProvider>
      </div>
    </motion.div>
  );
};

export default RequestCharityRole;
