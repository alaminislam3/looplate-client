import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAuth from "../../../Hooks/UseAuth";
import UseAxiosSecure from "../../../Hooks/useAxiosSecure";

const MyReviews = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["reviews", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/user?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });
   
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this review?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      const res = await axiosSecure.delete(`/reviews/${id}`);
      if (res.data.deletedCount > 0) {
        Swal.fire("Deleted!", "Your review has been removed.", "success");
        refetch();
      }
    }
  };

  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">My Reviews</h2>
      <div className="grid gap-4">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="p-4 border rounded-lg shadow-md bg-white space-y-1"
          >
            <h3 className="text-lg font-bold">{review.donationTitle}</h3>
            <p className="text-sm text-gray-600">Restaurant: {review.restaurantName}</p>
            <p className="text-sm text-gray-500">
              Time: {new Date(review.reviewTime).toLocaleString()}
            </p>
            <p className="mt-1">{review.description}</p>
            <button
              onClick={() => handleDelete(review._id)}
              className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
        {reviews.length === 0 && <p>You haven’t submitted any reviews yet.</p>}
      </div>
    </div>
  );
};

export default MyReviews;
