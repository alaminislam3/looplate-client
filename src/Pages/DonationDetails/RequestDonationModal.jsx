import React, { useState } from "react";
import UseAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";


const RequestDonationModal = ({ donation, user, onClose }) => {
  const axiosSecure = UseAxiosSecure();
  const [note, setNote] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      donationId: donation._id,
      requesterName: user.displayName,
      requesterEmail: user.email,
      note,
      status: "Pending",
      time: new Date(),
    };

    try {
      await axiosSecure.post("/donation-requests", requestData);
      Swal.fire({
        title: "Requested successfully!",
        icon: "success",
        draggable: true,
        timer: 1300
      });
      onClose();
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Request Donation</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <p><strong>Donation:</strong> {donation.title}</p>
          <p><strong>Restaurant:</strong> {donation.restaurant_name}</p>

          <textarea
            className="w-full p-2 border rounded"
            rows="4"
            placeholder="Write a note (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
              Send Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestDonationModal;
