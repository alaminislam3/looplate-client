import React from "react";
import UseAuth from "../../../Hooks/UseAuth";
import Loading from "../../../Shared/Loading/Loading";


const RestaurantProfile = () => {
  const { user , loading } = UseAuth();

  if(loading){
    return <Loading></Loading>
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl text-center space-y-4">
      {/* Logo */}
      <div className="flex justify-center">
        <img
          src={user?.photoURL || "https://i.ibb.co.com/4npGdSLZ/diz-sml-001.png"}
          alt="Restaurant Logo"
          className="w-24 h-24 rounded-full border-4 border-sky-400 shadow"
        />
      </div>

      {/* Name */}
      <h2 className="text-2xl font-bold text-gray-800">
        {user?.displayName || "Restaurant Name"}
      </h2>

      {/* Role */}
      <p className="text-sm text-white bg-sky-400 inline-block px-4 py-1 rounded-full font-semibold">
        Role: Restaurant
      </p>

      {/* Registration Date */}
      <p className="text-sm text-gray-500">
        Joined on:{" "}
        {user?.metadata?.creationTime
          ? new Date(user.metadata.creationTime).toLocaleDateString()
          : "N/A"}
      </p>
    </div>
  );
};

export default RestaurantProfile;
