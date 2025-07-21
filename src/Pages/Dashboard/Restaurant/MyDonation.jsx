import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router";
import UseAuth from "../../../Hooks/UseAuth";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Loading from "../../../Shared/Loading/Loading";

const MyDonations = () => {
  const { user ,loading } = UseAuth()
  const axiosSecure = UseAxiosSecure();
  
  const {data: donations = [],isLoading,refetch,} = useQuery({
    queryKey: ["myDonations", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email, 
  });

  if(loading){
    return <Loading></Loading>
   }

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This donation will be deleted permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e74c3c",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      const res = await axiosSecure.delete(`/donations/${id}`);
      if (res.data.deletedCount > 0) {
        Swal.fire("Deleted!", "Your donation has been deleted.", "success");
        refetch(); 
      }
    }
  };

  if (isLoading) return <p className="text-center">Loading donations...</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Donations</h2>

      {donations.length === 0 ? (
        <p>No donations found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {donations.map((donation) => (
            <div key={donation._id} className="border p-4 rounded shadow">
              <img
                src={donation.image}
                alt={donation.title}
                className="w-full h-48 object-cover rounded"
              />
              <h3 className="text-xl font-bold mt-2">{donation.title}</h3>
              <p>Food Type: {donation.food_type}</p>
              <p>Quantity: {donation.quantity}</p>
              <p>Restaurant: {donation.restaurant_name}</p>
              <p>
                Status:{" "}
                <span
                  className={`font-semibold ${
                    donation.status === "Verified"
                      ? "text-green-600"
                      : donation.status === "Rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {donation.status}
                </span>
              </p>

              <div className="mt-4 flex gap-3">
                {donation.status !== "Rejected" && (
                  <Link to={`/update/${donation._id}`}>
                    <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
                      Update
                    </button>
                  </Link>
                )}
                <button
                  onClick={() => handleDelete(donation._id)}
                  className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyDonations;
