import React from "react";
import { Link } from "react-router"; // Link import
import UseAuth from "../../../Hooks/UseAuth";
import Loading from "../../../Shared/Loading/Loading";

const AdminProfile = () => {
  const { user, loading } = UseAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-[#f1f3fa] dark:bg-[#0c0e18] shadow-xl rounded-2xl transition-colors">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
        {/* User Image */}
        <img
          src={user?.photoURL || "https://i.ibb.co.com/4npGdSLZ/diz-sml-001.png"}
          alt="User"
          className="w-32 h-32 rounded-full border-4 border-[#435cd1] shadow-lg object-cover"
        />

        {/* User Info */}
        <div className="flex-1 space-y-2 text-center md:text-left">
          <h2 className="text-3xl font-bold text-[#0c0e18] dark:text-[#f1f3fa]">
            Name: {user?.displayName || "User Name"}
          </h2>
          <p className="text-[#0c0e18] dark:text-[#f1f3fa] font-medium">
            Email: {user?.email || "No Email"}
          </p>
          <p className="text-[#0c0e18] dark:text-[#f1f3fa] font-medium">
            Phone: {user?.phoneNumber || "No Phone Number"}
          </p>
          <p className="text-[#0c0e18] dark:text-[#f1f3fa] font-medium">
            Address: {user?.address || "No Address Provided"}
          </p>
          <p className="text-gray-500 dark:text-gray-300 text-sm">
            Joined on:{" "}
            {user?.metadata?.creationTime
              ? new Date(user.metadata.creationTime).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
      </div>

      {/* Extra Info / Card Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-[#8c9eee] dark:bg-[#4d6bf4] rounded-xl shadow flex flex-col items-center transition-colors">
          <span className="font-semibold text-white">Role</span>
          <p className="text-white">Admin</p>
        </div>
        <div className="p-4 bg-[#8c9eee] dark:bg-[#4d6bf4] rounded-xl shadow flex flex-col items-center transition-colors">
          <span className="font-semibold text-white">Membership</span>
          <p className="text-white">No Membership required</p>
        </div>
        <div className="p-4 bg-[#8c9eee] dark:bg-[#4d6bf4] rounded-xl shadow flex flex-col items-center transition-colors">
          <span className="font-semibold text-white">Orders</span>
          <p className="text-white">559 Completed</p>
        </div>
        <div className="p-4 bg-[#8c9eee] dark:bg-[#4d6bf4] rounded-xl shadow flex flex-col items-center transition-colors">
          <span className="font-semibold text-white">Points</span>
          <p className="text-white">No point required</p>
        </div>
      </div>

      {/* See Full Overview Button */}
      <div className="mt-8 text-center">
        <Link
          to="/dashboard/adminoverview"
          className="inline-block bg-[#435cd1] hover:bg-[#4d6bf4] text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          See Full Overview
        </Link>
      </div>
    </div>
  );
};

export default AdminProfile;
