import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/useAxiosSecure";
import UseAuth from "../../../Hooks/UseAuth";

const Favorites = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();

  const { data: favorites = [], refetch } = useQuery({
    queryKey: ["favorites", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorites?email=${user.email}`);
      return res.data;
    },
  });

  const handleRemove = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to remove this from favorites!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/favorites/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Removed!", "The donation was removed from favorites.", "success");
          refetch();
        }
      }
    });
  };

  return (
    <div className="p-4 bg-[#f1f3fa] dark:bg-[#0c0e18] min-h-screen transition-colors">
      <h2 className="text-2xl font-bold mb-4 text-[#0c0e18] dark:text-[#f1f3fa]">My Favorites</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {favorites.map((fav) => (
          <div
            key={fav._id}
            className="bg-white dark:bg-[#1a1c28] shadow rounded-lg p-4 flex flex-col md:flex-row gap-4 transition-colors"
          >
            <img
              src={fav.image}
              alt={fav.title}
              className="w-full md:w-1/3 object-cover rounded"
            />
            <div className="flex-1 space-y-1 text-[#0c0e18] dark:text-[#f1f3fa]">
              <h3 className="text-xl font-semibold">{fav.title}</h3>
              <p><strong>Restaurant:</strong> {fav.restaurant_name}</p>
              <p><strong>Location:</strong> {fav.location}</p>
              <p><strong>Status:</strong> {fav.status}</p>
              <p><strong>Quantity:</strong> {fav.quantity}</p>

              <div className="mt-2 flex gap-3">
                <Link to={`/donation-details/${fav.donationId}`}>
                  <button className="bg-[#435cd1] hover:bg-[#4d6bf4] text-white px-3 py-1 rounded transition-colors">
                    View Details
                  </button>
                </Link>
                <button
                  onClick={() => handleRemove(fav._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
