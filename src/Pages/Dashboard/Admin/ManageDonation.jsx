import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../../Hooks/UseAxiosSecure";
import Loading from "../../../Shared/Loading/Loading";
import Swal from "sweetalert2";

const ManageDonation = () => {
  const axiosInstance = axiosSecure();

  const { data: donations = [], isLoading, refetch } = useQuery({
    queryKey: ["donations"],
    queryFn: async () => {
      const res = await axiosInstance.get("/donations-with-quantity");
      return res.data;
    },
  });

  const handleVerify = async (id) => {
    await axiosInstance.patch(`/donations/status/${id}`, { status: "Verified" });
    Swal.fire("Verified!", "Thanks", "success");
    refetch();
  };

  const handleReject = async (id) => {
    await axiosInstance.patch(`/donations/status/${id}`, { status: "Rejected" });
    Swal.fire("Rejected!", "Thanks", "success");
    refetch();
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="overflow-x-auto p-4 bg-[#f1f3fa] dark:bg-[#0c0e18] transition-colors min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-[#0c0e18] dark:text-[#f1f3fa] transition-colors">
        Manage Donations
      </h2>
      <table className="table w-full border border-gray-300 dark:border-gray-600 transition-colors">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700 text-[#0c0e18] dark:text-[#f1f3fa] transition-colors">
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
            <tr
              key={donation._id}
              className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
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
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    >
                      Verify
                    </button>
                    <button
                      onClick={() => handleReject(donation._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
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
