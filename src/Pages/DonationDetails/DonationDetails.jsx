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

const DonationDetails = () => {
  const { id } = useParams();
  const axiosSecure = UseAxiosSecure();
  const { user ,loading } = UseAuth();
  const {role, roleLoading} = UseUserRole()
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const { data: donation = {}, isLoading } = useQuery({
    queryKey: ["donation", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations/${id}`);
      return res.data;
    },
  });
  // console.log(donation);

  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?donationId=${id}`);
      return res.data;
    },
  });

  const handleSaveToFavorites = async () => {
    const favorite = {
        donationId: donation._id,   // assuming you have full donation data
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
        title: "Data is saved!",
        icon: "success",
        draggable: true,
        timer: 1300
      });
  };

  const handleConfirmPickup = async () => {
    await axiosSecure.patch(`/donations/${id}/pickup`);
    Swal.fire({
      title: "Marked as picked up!",
      icon: "success",
      draggable: true,
      timer: 1300
    });
  };

  if (loading || roleLoading || isLoading){
    return <Loading></Loading>
  } 

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <img
        src={donation.image}
        alt={donation.title}
        className="w-full max-w-md h-auto object-cover rounded-lg"
      />
      <h1 className="text-2xl font-bold">{donation.title}</h1>
      <p><strong>Food Type:</strong> {donation.food_type}</p>
      <p><strong>Quantity:</strong> {donation.quantity}</p>
      <p><strong>Pickup Time:</strong> {donation.pickupTime}</p>
      <p><strong>Status:</strong> {donation.status}</p>
      <p><strong>Restaurant:</strong> {donation.restaurant_name}, {donation.location}</p>

      {(role === "user" || role === "charity") && (
        <button
          onClick={handleSaveToFavorites}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-sky-400"
        >
          Save to Favorites
        </button>
      )}

      {role === "charity" && (
        <>
          <button
            onClick={() => setShowRequestModal(true)}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-sky-400"
          >
            Request Donation
          </button>

          {donation.status === "Accepted" && (
            <button
              onClick={handleConfirmPickup}
              className="px-4 py-2 bg-primary text-white rounded ml-2 hover:bg-sky-400"
            >
              Confirm Pickup
            </button>
          )}
        </>
      )}

      <h2 className="text-xl font-semibold mt-6">Reviews</h2>
      <div className="space-y-3">
        {reviews.map((review) => (
          <div key={review._id} className="border p-3 rounded shadow">
            <p><strong>{review.reviewerName}</strong> ({review.rating}/5)</p>
            <p>{review.description}</p>
            <p className="text-sm text-gray-500">{new Date(review.time).toLocaleString()}</p>
          </div>
        ))}
      </div>

      {(role === "user" || role === "charity") && (
        <button
          onClick={() => setShowReviewModal(true)}
          className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-sky-400"
        >
          Add Review
        </button>
      )}

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
    </div>
  );
};

export default DonationDetails;
