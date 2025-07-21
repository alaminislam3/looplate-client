import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const UpdateDonation = () => {
  const { id } = useParams();
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const imageHostKey = import.meta.env.VITE_Upload_Img;
  const imageUploadURL = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;

  const { register, handleSubmit, reset } = useForm();

  // ✅ Fetch existing donation
  const { data: donation = {}  } = useQuery({
    queryKey: ['donation', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations/${id}`);
      return res.data;
    }
  });

  // ✅ PATCH Mutation
  const mutation = useMutation({
    mutationFn: async (updateData) => {
      const res = await axiosSecure.patch(`/donations/${id}`, updateData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['donation']);
      Swal.fire("Success!", "Donation updated successfully!", "success");
      navigate("/dashboard/mydonation"); // Redirect
    },
    onError: () => {
      Swal.fire("Error!", "Failed to update donation.", "error");
    }
  });

  // ✅ Submit Handler
  const onSubmit = async (data) => {
    let imgURL = donation.image;

    if (data.image && data.image[0]) {
      const imageFile = { image: data.image[0] };
      const res = await axios.post(imageUploadURL, imageFile, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      imgURL = res.data.data.display_url;
    }

    const updatedData = {
      title: data.title,
      food_type: data.food_type,
      quantity: data.quantity,
      pickup_time: data.pickup_time,
      location: data.location,
      image: imgURL,
    };

    mutation.mutate(updatedData);
  };

  // ✅ Fill form after data load
  React.useEffect(() => {
    if (donation && donation._id) {
      reset(donation);
    }
  }, [donation, reset]);

  

  return (
    <div className="max-w-xl mx-auto p-4 shadow-lg bg-white rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Update Donation</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("title", { required: true })} placeholder="Donation Title" className="w-full p-2 border rounded" />

        <input {...register("food_type", { required: true })} placeholder="Food Type" className="w-full p-2 border rounded" />

        <input {...register("quantity", { required: true })} placeholder="Quantity" className="w-full p-2 border rounded" />

        <input {...register("pickup_time", { required: true })} placeholder="Pickup Time Window" className="w-full p-2 border rounded" />

        <input readOnly value={donation.restaurant_name} className="w-full p-2 border rounded bg-gray-100" />

        <input readOnly value={donation.email} className="w-full p-2 border rounded bg-gray-100" />

        <input {...register("location", { required: true })} placeholder="Location" className="w-full p-2 border rounded" />

        <input {...register("image")} type="file" accept="image/*" className="w-full" />

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Update Donation</button>
      </form>
    </div>
  );
};

export default UpdateDonation;
