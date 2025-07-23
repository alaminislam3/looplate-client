import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";


const ManageRoleRequests = () => {
  const axiosSecure = UseAxiosSecure();

  const { data: requests = [], refetch } = useQuery({
    queryKey: ["charity-requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/charityrequests");
      return res.data;
    },
  });

  const handleApprove = async (id, email) => {
    const res = await axiosSecure.patch(`/charityrequests/approve/${id}`, { email });
    if (res.data.modifiedCount > 0) {
      refetch();
      Swal.fire("Approved!", "The request has been approved.", "success");
    }
  };

  const handleReject = async (id) => {
    const res = await axiosSecure.patch(`/charityreq/reject/${id}`);
    if (res.data.modifiedCount > 0) {
      refetch();
      Swal.fire("Rejected!", "The request has been rejected.", "error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Role Requests</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Organization</th>
              <th>Mission</th>
              <th>Transaction ID</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, index) => (
              <tr key={req._id}>
                <td>{index + 1}</td>
                <td>{req.name}</td>
                <td>{req.email}</td>
                <td>{req.organizationName}</td>
                <td>{req.mission}</td>
                <td>{req.transactionId}</td>
                <td>{req.status}</td>
                <td className="space-x-2">
                  {req.status === "Pending" && (
                    <>
                      <button
                        onClick={() => handleApprove(req._id, req.email)}
                        className="btn btn-sm btn-success"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(req._id)}
                        className="btn btn-sm btn-error"
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
    </div>
  );
};

export default ManageRoleRequests;
