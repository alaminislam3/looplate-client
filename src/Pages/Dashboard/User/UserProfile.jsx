import React from "react";
import UseAuth from "../../../Hooks/UseAuth";
import Loading from "../../../Shared/Loading/Loading";

const UserProfile = () => {
  const { user, loading } = UseAuth();

  if (loading) {
    return <Loading />;
  }
  console.log(user);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white shadow-xl rounded-2xl">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
        {/* User Image */}
        <img
          src={user?.photoURL || "https://i.ibb.co/84t49VFN/images.jpg"}
          alt="User"
          className="w-32 h-32 rounded-full border-4 border-sky-400 shadow-lg object-cover"
        />

        {/* User Info */}
        <div className="flex-1 space-y-2 text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-800"> Name :
            {user?.displayName || "User Name"}
          </h2>
          <p className="text-gray-600 font-medium"> Email : {user?.email || "No Email"}</p>
          <p className="text-gray-600 font-medium">
          Phone :  {user?.phoneNumber || "No Phone Number"}
          </p>
          <p className="text-gray-600 font-medium">
           Address : {user?.address || "No Address Provided"}
          </p>
          <p className="text-gray-500 text-sm">
            Joined on:{" "}
            {user?.metadata?.creationTime
              ? new Date(user.metadata.creationTime).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
      </div>

      {/* Extra Info / Card Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-sky-50 rounded-xl shadow flex flex-col items-center">
          <span className="font-semibold text-sky-500">Role</span>
          <p className="text-gray-700">User</p>
        </div>
        <div className="p-4 bg-sky-50 rounded-xl shadow flex flex-col items-center">
          <span className="font-semibold text-sky-500">Membership</span>
          <p className="text-gray-700">Standard</p>
        </div>
        <div className="p-4 bg-sky-50 rounded-xl shadow flex flex-col items-center">
          <span className="font-semibold text-sky-500">Orders</span>
          <p className="text-gray-700">12 Completed</p>
        </div>
        <div className="p-4 bg-sky-50 rounded-xl shadow flex flex-col items-center">
          <span className="font-semibold text-sky-500">Points</span>
          <p className="text-gray-700">230</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
