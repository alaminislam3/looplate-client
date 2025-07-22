import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../../Hooks/UseAxiosSecure";
import { useState } from "react";
import Loading from "../../../Shared/Loading/Loading";

const ManageDonation = () => {
  const axiosInstance = axiosSecure();
  const [refresh, setRefresh] = useState(false);

  const { data: donations = [], isLoading } = useQuery({
    queryKey: ["donations", refresh],
    queryFn: async () => {
      const res = await axiosInstance.get("/donations-with-quantity");
      return res.data;
    },
  });
  

  const handleVerify = async (id) => {
    await axiosInstance.patch(`/donations/verify/${id}`, { status: "Verified" });
    setRefresh(!refresh);
  };

  const handleReject = async (id) => {
    await axiosInstance.patch(`/donations/reject/${id}`, { status: "Rejected" });
    setRefresh(!refresh);
  };

  if (isLoading){
    return <Loading></Loading>
  }

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Donations</h2>
      <table className="table w-full">
        <thead>
          <tr className="bg-gray-200">
            <th>Title</th>
            <th>Food Type</th>
            <th>Restaurant</th>
            <th>Email</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation) => (
            <tr key={donation._id} className="hover:bg-gray-50">
              <td>{donation.title}</td>
              <td>{donation.food_type}</td>
              <td>{donation.restaurant_name}</td>
              <td>{donation.email}</td>
              <td>{donation.quantity}</td>
              <td>{donation.status}</td>
              <td className="flex gap-2">
                {donation.status !== "Verified" && donation.status !== "Rejected" && (
                  <>
                    <button
                      onClick={() => handleVerify(donation._id)}
                      className="px-3 py-1 bg-green-500 text-white rounded"
                    >
                      Verify
                    </button>
                    <button
                      onClick={() => handleReject(donation._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageDonation;
