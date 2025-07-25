import React, { useState,  } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import SocialLogin from "../SocialLogin/SocialLogin";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import UseAxios from "../../../Hooks/UseAxios";
import UseAuth from "../../../Hooks/UseAuth";

const Register = () => {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState("");
  const { registration, updateUserProfile } = UseAuth()
  const axiosSecure =UseAxiosSecure()
  const axiosInstance= UseAxios()

  const { register,handleSubmit,formState: { errors } } = useForm();

  const onsubmit = (data) => {
    registration(data.email, data.password)
      .then(async (result) => {
        // console.log(result.user);
  
        // ✅ Step 2: Get JWT token from server and store it
        const loggedUser = { email: result.user.email };
        const tokenRes = await axiosInstance.post("/jwt", loggedUser);
        localStorage.setItem("access-token", tokenRes.data.token);
  
        navigate("/"); // redirect after login
  
        // ✅ save user to database using axiosSecure
        const userInfo = {
          email: data.email,
          role: "user",
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        };
        const userRes = await axiosSecure.post("/users", userInfo);
        // console.log(userRes.data);
  
        // ✅ update profile
        const userProfile = {
          displayName: data.name,
          photoURL: profilePic,
        };
        updateUserProfile(userProfile)
          .then(() => {
            // console.log("profile name and picture updated");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      
  };
  

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);
    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Upload_Img}`;
    const res = await axios.post(imageUploadUrl, formData);
    setProfilePic(res.data.data.url);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md p-8 shadow-lg rounded-xl bg-white">
        <h2 className="text-3xl md:text-4xl text-center font-bold text-primary mb-6">
          Create an account
        </h2>
        <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Your name"
            />
          </div>

          {/* Photo */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Profile Photo</label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="w-full"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 , pattern: {  value: /^[^A-Z]*$/} })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-600 mt-1 text-sm">
                You should have to fillup password!
              </p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-600 mt-1 text-sm">
                Password should be minimum six characters or more.
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-600 mt-1 text-sm">
               Please don't use capital latter.
              </p>
            )}
          </div>

          {/* Login redirect */}
          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-primary underline">
              Login
            </Link>
          </p>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Register
          </button>

        </form>
          {/* Social login */}
          <SocialLogin />
      </div>
    </div>
  );
};

export default Register;
