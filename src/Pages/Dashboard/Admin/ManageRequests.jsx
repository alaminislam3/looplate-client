import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const ManageRequests = () => {
  const axiosSecure = UseAxiosSecure();

  // ✅ Load all donation requests
  const { data: requests = [], refetch } = useQuery({
    queryKey: ["donation-requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admindonationrequests");
      return res.data;
    },
  });

  // ✅ Handle delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/admindonationrequests/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "The request has been removed.", "success");
          refetch();
        }
      }
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Manage Donation Requests</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th>#</th>
              <th>Donation Title</th>
              <th>Charity Name</th>
              <th>Charity Email</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, index) => (
              <tr key={req._id}>
                <td>{index + 1}</td>
                <td>{req.donationtitle}</td>
                <td>{req.requesterName}</td>
                <td>{req.email}</td>
                <td>{req.note}</td>
                <td>
                  <button
                    onClick={() => handleDelete(req._id)}
                    className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No donation requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageRequests;
