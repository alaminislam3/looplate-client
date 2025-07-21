import { useForm } from "react-hook-form";
import axios from "axios";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import UseAuth from "../../../Hooks/UseAuth";
import Loading from "../../../Shared/Loading/Loading";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const AddDonation = () => {
  const { user, loading  } = UseAuth()
  const axiosSecure = UseAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate()

  if(loading){
    return <Loading></Loading>
  }

  const imageHostKey = import.meta.env.VITE_Upload_Img;
  const imageUploadURL = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };

    try {
      // Step 1: Upload image to imgbb
      const res = await axios.post(imageUploadURL, imageFile, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const imgURL = res.data.data.display_url;

      // Step 2: Prepare donation data
      const donationData = {
        title: data.title,
        food_type: data.food_type,
        quantity: data.quantity,
        pickup_time: data.pickup_time,
        restaurant_name: user.displayName,
        email: user.email,
        location: data.location,
        image: imgURL,
        status: "Pending",
      };

      // Step 3: Post to server
      const postRes = await axiosSecure.post("/donations", donationData);
      if (postRes.data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Donation added successfully!",
          icon: "success",
          confirmButtonText: "OK",
          timer: 1500
        });
        navigate('/dashboard/mydonation')
        reset();
      }

    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "OK"
      });;
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 shadow-lg bg-white rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Donation</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("title", { required: true })} placeholder="Donation Title" className="w-full p-2 border rounded" />

        <input {...register("food_type", { required: true })} placeholder="Food Type (e.g., Bakery)" className="w-full p-2 border rounded" />

        <input {...register("quantity", { required: true })} placeholder="Quantity (e.g., 5kg or 10 portions)" className="w-full p-2 border rounded" />

        <input {...register("pickup_time", { required: true })} placeholder="Pickup Time Window" className="w-full p-2 border rounded" />

        <input readOnly value={user?.displayName} className="w-full p-2 border rounded bg-gray-100" />

        <input readOnly value={user?.email} className="w-full p-2 border rounded bg-gray-100" />

        <input {...register("location", { required: true })} placeholder="Location (Address)" className="w-full p-2 border rounded" />

        <input {...register("image", { required: true })} type="file" accept="image/*" className="w-full" />

        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Add Donation</button>
      </form>
    </div>
  );
};

export default AddDonation;
