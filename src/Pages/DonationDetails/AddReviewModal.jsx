import { useForm } from "react-hook-form";
import UseAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";


const AddReviewModal = ({ donationId, user, onClose }) => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = UseAxiosSecure();

  const onSubmit = async (data) => {
    const review = {
      donationId,
      reviewerName: user.displayName || "Anonymous",
      reviewerEmail: user.email,
      rating: parseInt(data.rating),
      description: data.description,
      time: new Date().toISOString(),
    };

    try {
      await axiosSecure.post("/reviews", review);
      Swal.fire({
        title: "Review added!",
        icon: "success",
        draggable: true,
        timer: 1300
      });
      reset();
      onClose();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add Your Review</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-semibold">Rating (1 to 5)</label>
            <input
              type="number"
              min={1}
              max={5}
              {...register("rating", { required: true })}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Description</label>
            <textarea
              {...register("description", { required: true })}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReviewModal;
