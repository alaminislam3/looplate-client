import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";


const ReceivedDonations = () => {
  const axiosSecure = UseAxiosSecure();
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [reviewText, setReviewText] = useState("");

  
  const { data: donations = [], refetch, isLoading } = useQuery({
    queryKey: ["receivedDonations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donationrequests/pickedup");
      return res.data
    },
  });
   
  // ✅ Review POST handler
  const handleReviewSubmit = async () => {
    const review = {
      donationId: selectedDonation._id,
      title: selectedDonation.title,
      restaurant_name: selectedDonation.restaurant_name,
      reviewText,
      date: new Date(),
    };

    try {
      await axiosSecure.post("/reviews", review);
     Swal.fire(
             "Review Submitted!",
             
             "success",

           );;
      setSelectedDonation(null);
      setReviewText("");
      refetch(); // Optional: নতুন কিছু load করতে চাইলে
    } catch (error) {
      console.error("Review post error:", error);
      alert("Failed to submit review");
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Received Donations</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {donations.map((donation) => (
          <div
            key={donation._id}
            className="bg-white rounded-xl shadow-md p-4 border"
          >
            <h3 className="text-lg font-semibold">{donation.donationtitle}</h3>
            <p><strong>Restaurant:</strong> {donation.requesterName}</p>
            <p><strong>Food Type:</strong> {donation.foodtype}</p>
            <p><strong>Quantity:</strong> {donation.quantity}</p>
            <p><strong>Pickup Date:</strong> {donation.time || "N/A"}</p>

            <button
              onClick={() => setSelectedDonation(donation)}
              className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Review
            </button>
          </div>
        ))}
      </div>

      {/* Review Modal */}
      {selectedDonation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-xl font-bold mb-2">
              Review for: {selectedDonation.title}
            </h2>
            <textarea
              className="w-full border p-2 rounded mb-4"
              rows="4"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review here..."
            ></textarea>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setSelectedDonation(null);
                  setReviewText("");
                }}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleReviewSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceivedDonations;
