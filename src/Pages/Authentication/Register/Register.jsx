import React, { useState } from "react";
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
  const { registration, updateUserProfile } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const axiosInstance = UseAxios();

  const { register: formRegister, handleSubmit, formState: { errors } } = useForm();

  const onsubmit = (data) => {
    registration(data.email, data.password)
      .then(async (result) => {
        const loggedUser = { email: result.user.email };
        const tokenRes = await axiosInstance.post("/jwt", loggedUser);
        localStorage.setItem("access-token", tokenRes.data.token);

        // Save user in database
        const userInfo = {
          email: data.email,
          role: "user",
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        };
        await axiosSecure.post("/users", userInfo);

        // Update profile
        const userProfile = {
          displayName: data.name,
          photoURL: profilePic,
        };
        updateUserProfile(userProfile).catch(console.log);

        navigate("/"); // redirect
      })
      .catch(console.log);
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
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#f1f3fa] dark:bg-[#0c0e18] transition-colors">
      <div className="w-full max-w-md p-8 shadow-lg rounded-xl bg-white dark:bg-[#1a1c2b] transition-colors">
        <h2 className="text-3xl md:text-4xl text-center font-bold text-[#435cd1] dark:text-[#8c9eee] mb-6 transition-colors">
          Create an account
        </h2>

        <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block mb-1 font-medium text-[#0c0e18] dark:text-[#f1f3fa] transition-colors">Name</label>
            <input
              type="text"
              {...formRegister("name", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#435cd1] dark:focus:ring-[#8c9eee] bg-white dark:bg-[#121426] text-[#0c0e18] dark:text-[#f1f3fa] transition-colors"
              placeholder="Your name"
            />
          </div>

          {/* Profile Photo */}
          <div>
            <label className="block mb-1 font-medium text-[#0c0e18] dark:text-[#f1f3fa] transition-colors">Profile Photo</label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="w-full text-[#0c0e18] dark:text-[#f1f3fa]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium text-[#0c0e18] dark:text-[#f1f3fa] transition-colors">Email</label>
            <input
              type="email"
              {...formRegister("email", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#435cd1] dark:focus:ring-[#8c9eee] bg-white dark:bg-[#121426] text-[#0c0e18] dark:text-[#f1f3fa] transition-colors"
              placeholder="Email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium text-[#0c0e18] dark:text-[#f1f3fa] transition-colors">Password</label>
            <input
              type="password"
              {...formRegister("password", {
                required: true,
                minLength: 6,
                pattern: /^[^A-Z]*$/,
              })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#435cd1] dark:focus:ring-[#8c9eee] bg-white dark:bg-[#121426] text-[#0c0e18] dark:text-[#f1f3fa] transition-colors"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-rose-600 mt-1 text-sm">You should have to fill up password!</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-rose-600 mt-1 text-sm">Password should be minimum six characters or more.</p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-rose-600 mt-1 text-sm">Please don't use capital letters.</p>
            )}
          </div>

          {/* Login redirect */}
          <p className="text-sm text-center text-[#0c0e18] dark:text-[#f1f3fa] transition-colors">
            Already have an account?{" "}
            <Link to="/login" className="text-[#435cd1] dark:text-[#8c9eee] underline">
              Login
            </Link>
          </p>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-[#435cd1] dark:bg-[#4d6bf4] text-white py-2 rounded-md hover:bg-[#4d6bf4] dark:hover:bg-[#8c9eee] transition-colors"
          >
            Register
          </button>
        </form>

        {/* Social login */}
        <div className="mt-4">
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Register;
