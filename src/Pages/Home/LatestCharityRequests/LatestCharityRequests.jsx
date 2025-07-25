import React from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import UseAuth from "../../../Hooks/UseAuth";

const LatestCharityRequests = () => {
  const axiosSecure = UseAxiosSecure();
  const {user } =UseAuth()

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["latestCharityRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/latest-charity-requests");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="text-center py-10 text-primary font-medium">Loading...</div>
    );
  }

  return (
    <section className="py-12 px-4 md:px-10 bg-gray-50">
      <h2 className="text-3xl font-bold text-center text-primary mb-8">
        Latest Charity Requests
      </h2>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500">No requests found.</p>
      ) : (
        <div className="space-y-6">
          {requests.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-gray-200 rounded-md p-4 md:p-6 shadow hover:shadow-md transition duration-300"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                
                {/* Image Section */}
                <div className="w-full md:w-1/3">
                  <img
                    src={"https://i.ibb.co/mVy5Pm6s/cooperation-team-work-organization-avatar-512.webp"}
                    alt="User"
                    className="w-full h-48 object-cover rounded-md"
                  />
                </div>

                {/* Text Section */}
                <div className="w-full md:w-2/3 text-gray-800 space-y-2">
                  <p><span className="font-semibold">Organization:</span> {item.organizationName}</p>
                  <p><span className="font-semibold">Mission:</span> {item.mission}</p>
                  <p>
                    <span className="font-semibold">Status:</span>{" "}
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        item.status === "Approved"
                          ? "bg-green-100 text-green-600"
                          : item.status === "Rejected"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {item.status || "Pending"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default LatestCharityRequests;
