import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Shared/Loading/Loading";

const RequestDonation = () => {
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();
  

  // 1️⃣ Fetch Requests
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["allDonationRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/requested-donation`);
      return res.data;
    }
  });
  console.log(requests);

  // 2️⃣ Accept/Reject Mutation
  const mutation = useMutation({
    mutationFn: async ({ id, donationTitle, action }) => {
      const res = await axiosSecure.patch(`/donation-requests/${id}`, {
        action,
        donationTitle,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["restaurantDonationRequests"]);
    },
  });

  // 3️⃣ Handle Accept
  const handleAccept = (id, donationTitle) => {
    mutation.mutate(
      { id, donationTitle, action: "accepted" },
      {
        onSuccess: () => {
          Swal.fire("Accepted!", "The request has been accepted.", "success");
        },
        onError: () => {
          Swal.fire("Error!", "Could not accept the request.", "error");
        },
      }
    );
  };

  // 4️⃣ Handle Reject
  const handleReject = (id, donationTitle) => {
    mutation.mutate(
      { id, donationTitle, action: "reject" },
      {
        onSuccess: () => {
          Swal.fire("Rejected!", "The request has been rejected.", "info");
        },
        onError: () => {
          Swal.fire("Error!", "Could not reject the request.", "error");
        },
      }
    );
  };

  if (isLoading) {
    return <Loading></Loading>
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Requested Donations</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th>Donation Title</th>
              <th>Food Type</th>
              <th>Charity Name</th>
              <th>Charity Email</th>
              <th>Description</th>
              <th>Pickup Time</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td>{req.donationtitle}</td>
                <td>{req.foodtype}</td>
                <td>{req.charityname}</td>
                <td>{req.charityemail}</td>
                <td>{req.note}</td>
                <td>{req.pickupTime}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      req.status === "Pending"
                        ? "bg-yellow-200"
                        : req.status === "accepted"
                        ? "bg-green-200"
                        : "bg-red-200"
                    }`}
                  >
                    {req.status}
                  </span>
                </td>
                <td className="flex gap-2 justify-center">
                  {req.status === "Pending" && (
                    <>
                      <button
                        onClick={() => handleAccept(req._id, req.donationtitle)}
                        className="px-3 py-1 bg-green-500 text-white rounded"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(req._id, req.donationtitle)}
                        className="px-3 py-1 bg-red-500 text-white rounded"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestDonation;
