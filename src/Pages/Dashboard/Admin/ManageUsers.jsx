import { useQuery, useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import UseAuth from "../../../Hooks/UseAuth";
import Loading from "../../../Shared/Loading/Loading";

const ManageUsers = () => {
  const axiosSecure = UseAxiosSecure();
  const { loading } = UseAuth();

  // GET all users
  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // PATCH user role
  const updateRoleMutation = useMutation({
    mutationFn: async ({ id, role }) => {
      const res = await axiosSecure.patch(`/users/role/${id}`, { role });
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        title: "Role updated successfully!",
        icon: "success",
        draggable: true,
        timer: 1300,
      });
      refetch();
    },
  });

  // DELETE user with Swal confirmation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/users/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        title: "User deleted successfully",
        icon: "success",
        draggable: true,
        timer: 1300,
      });
      refetch();
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  if (isLoading || loading) {
    return <Loading />;
  }

  return (
    <div className="p-4 bg-[#f1f3fa] dark:bg-[#0c0e18] min-h-screen transition-colors">
      <h2 className="text-2xl font-bold mb-4 text-[#0c0e18] dark:text-[#f1f3fa] transition-colors">
        Manage Users
      </h2>
      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-300 dark:border-gray-600 transition-colors">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-[#0c0e18] dark:text-[#f1f3fa] transition-colors">
              <th>#</th>
              <th>Email</th>
              <th>Role</th>
              <th colSpan={4}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <td>{index + 1}</td>
                <td>{user.email}</td>
                <td>{user.role || "User"}</td>
                <td>
                  <button
                    onClick={() =>
                      updateRoleMutation.mutate({ id: user._id, role: "admin" })
                    }
                    disabled={user.role === "admin"}
                    className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                  >
                    Make Admin
                  </button>
                </td>
                <td>
                  <button
                    onClick={() =>
                      updateRoleMutation.mutate({ id: user._id, role: "restaurant" })
                    }
                    disabled={user.role === "restaurant"}
                    className="btn btn-sm bg-green-500 text-white hover:bg-green-600 transition-colors"
                  >
                    Make Restaurant
                  </button>
                </td>
                <td>
                  <button
                    onClick={() =>
                      updateRoleMutation.mutate({ id: user._id, role: "charity" })
                    }
                    disabled={user.role === "charity"}
                    className="btn btn-sm bg-purple-500 text-white hover:bg-purple-600 transition-colors"
                  >
                    Make Charity
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="btn btn-sm bg-red-500 text-white hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-5 text-[#0c0e18] dark:text-[#f1f3fa]">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
