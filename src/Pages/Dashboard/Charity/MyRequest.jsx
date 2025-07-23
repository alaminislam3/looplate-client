import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAuth from "../../../Hooks/UseAuth";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Loading from "../../../Shared/Loading/Loading";
import { data } from "react-router";

const MyRequest = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const { data: requests = [], isLoading , refetch} = useQuery({
    queryKey: ["donation-requests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donationrequests?email=${user?.email}`);
      return res.data;
    },
  });
  

  const handleCancel = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel this request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/donationrequests/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Cancelled!", "Your request has been removed.", "success");
          refetch();
        }
      } catch (err) {
        Swal.fire("Error!", "Failed to cancel request.", "error");
      }
    }
  };

  if (isLoading) {
    return <Loading></Loading>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {requests.map((req) => (

        <div
          key={req._id}
          className="border shadow-lg rounded-xl p-4 space-y-2 bg-white"
        >
          <h2 className="text-xl font-semibold">FOOD : {req.donationtitle}</h2>
          <p>
            <strong>Restaurant:</strong> {req.requesterName}
          </p>
          <p>
            <strong>Food Type:</strong> {req.foodtype}
          </p>
          <p>
            <strong>Quantity:</strong> {req.quantity}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`font-medium ${
                req.status === "Pending"
                  ? "text-yellow-500"
                  : req.status === "Accepted"
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {req.status}
            </span>
          </p>

          {req.status === "Pending" && (
            <button
              onClick={() => handleCancel(req._id)}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
            >
              Cancel
            </button>

          )}

        </div>
      ))}
    </div>
  );
};

export default MyRequest;
