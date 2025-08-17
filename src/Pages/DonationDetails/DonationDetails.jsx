import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import UseUserRole from "../../Hooks/UseUserRole";
import Loading from "../../Shared/Loading/Loading";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import UseAuth from "../../Hooks/UseAuth";
import RequestDonationModal from "./RequestDonationModal";
import AddReviewModal from "./AddReviewModal";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const DonationDetails = () => {
  const { id } = useParams();
  const axiosSecure = UseAxiosSecure();
  const { user, loading } = UseAuth();
  const { role, roleLoading } = UseUserRole();
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const { data: donation = {}, isLoading } = useQuery({
    queryKey: ["donation", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations/${id}`);
      return res.data;
    },
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?donationId=${id}`);
      return res.data;
    },
  });

  const handleSaveToFavorites = async () => {
    const favorite = {
      donationId: donation._id,
      email: user.email,
      image: donation.image,
      title: donation.title,
      restaurant_name: donation.restaurant_name,
      location: donation.location,
      quantity: donation.quantity,
      status: donation.status,
    };
    await axiosSecure.post("/favorites", favorite);
    Swal.fire({
      title: "Saved to Favorites!",
      icon: "success",
      timer: 1300,
      showConfirmButton: false,
    });
  };

  const handleConfirmPickup = async () => {
    await axiosSecure.patch(`/donations/${id}/pickup`);
    Swal.fire({
      title: "Marked as Picked Up!",
      icon: "success",
      timer: 1300,
      showConfirmButton: false,
    });
  };

  if (loading || roleLoading || isLoading) return <Loading />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className=" p-4 md:p-8 px-4  md:px-8 lg:px-16  md:py-20 py-10 space-y-6"
    >
      {/* Two-column layout */}
      <div className="flex flex-col p-10   shadow-xl lg:flex-row gap-6 lg:gap-10 items-start">
        {/* Left: Image */}
        <div className="flex-shrink-0 w-full lg:w-1/3 flex justify-center">
          <div className="overflow-hidden rounded-lg shadow-lg">
            <img
              src={donation.image}
              alt={donation.title}
              className="w-full h-64 md:h-80 lg:h-100 object-cover transform transition duration-500 hover:scale-105"
            />
          </div>
        </div>

        {/* Right: Details */}
        <div className="flex-1 space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            {donation.title}
          </h1>
          <p>
            <strong>Food Type:</strong> {donation.food_type}
          </p>
          <p>
            <strong>Quantity:</strong> {donation.quantity}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                donation.status === "Verified"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {donation.status}
            </span>
          </p>
          <p>
            <strong>Restaurant:</strong> {donation.restaurant_name},{" "}
            {donation.location}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-2">
            {(role === "user" || role === "charity") && (
              <button
                onClick={handleSaveToFavorites}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-sky-400 transition"
              >
                Save to Favorites
              </button>
            )}

            {role === "charity" && (
              <>
                <button
                  onClick={() => setShowRequestModal(true)}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-sky-400 transition"
                >
                  Request Donation
                </button>

                {donation.status === "Accepted" && (
                  <button
                    onClick={handleConfirmPickup}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-sky-400 transition"
                  >
                    Confirm Pickup
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Reviews</h2>
        {reviews.length === 0 && (
          <p className="text-gray-500">No reviews yet.</p>
        )}
        <div className="space-y-3">
          {reviews.map((review) => (
            <motion.div
              key={review._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="border p-3 rounded-lg shadow-sm bg-white"
            >
              <p className="font-semibold">
                {review.reviewerName} ({review.rating}/5)
              </p>
              <p className="text-gray-700">{review.description}</p>
              <p className="text-xs text-gray-400">
                {new Date(review.time).toLocaleString()}
              </p>
            </motion.div>
          ))}
        </div>

        {(role === "user" || role === "charity") && (
          <button
            onClick={() => setShowReviewModal(true)}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-sky-400 transition"
          >
            Add Review
          </button>
        )}
      </div>

      {/* Modals */}
      {showRequestModal && (
        <RequestDonationModal
          donation={donation}
          user={user}
          onClose={() => setShowRequestModal(false)}
        />
      )}

      {showReviewModal && (
        <AddReviewModal
          donationId={id}
          user={user}
          donationTitle={donation.title}
          restaurantName={donation.restaurant_name}
          onClose={() => setShowReviewModal(false)}
        />
      )}
    </motion.div>
  );
};

export default DonationDetails;
