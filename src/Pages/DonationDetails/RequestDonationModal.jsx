import React, { useState } from "react";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../Hooks/useAxiosSecure";

const RequestDonationModal = ({ donation, user, onClose }) => {
  const axiosSecure = UseAxiosSecure();
  const [note, setNote] = useState("");
  const [pickupTime, setPickupTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      charityname: user?.displayName,
      charityemail: user?.email,
      pickupTime, // from input
      email: user.email,
      donationtitle: donation.title,
      requesterName: donation.requesterName,
      foodtype: donation.food_type,
      quantity: donation.quantity,
      note,
      status: "Pending",
    };

    try {
      await axiosSecure.post("/donation-requests", requestData);
      Swal.fire({
        title: "Requested successfully!",
        icon: "success",
        timer: 1300,
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

          <div>
            <label className="block text-sm font-medium">Donation Title</label>
            <input
              type="text"
              value={donation.title}
              readOnly
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Restaurant Name</label>
            <input
              type="text"
              value={donation.restaurant_name}
              readOnly
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Charity Name</label>
            <input
              type="text"
              value={user?.displayName}
              readOnly
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Charity Email</label>
            <input
              type="email"
              value={user?.email}
              readOnly
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Pickup Time</label>
            <input
              type="datetime-local"
              required
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Request Description</label>
            <textarea
              className="w-full p-2 border rounded"
              rows="4"
              placeholder="Write a note (optional)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

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
