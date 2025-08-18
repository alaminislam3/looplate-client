import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { useContext } from "react";
import SocialLogin from "../SocialLogin/SocialLogin";
import { Authcontext } from "../../../Context/AuthContext";
import axios from "axios";

const Login = () => {
  const { singIn } = useContext(Authcontext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "user@g.com",
      password: "alamin123",
    },
  });

  const onsubmit = (data) => {
    singIn(data.email, data.password)
      .then(async (result) => {
        const loggedUser = { email: result.user.email };
        const tokenRes = await axios.post(
          "https://looplate-server.vercel.app/jwt",
          loggedUser
        );
        localStorage.setItem("access-token", tokenRes.data.token);
        navigate(from);
      })
      .catch((error) => {
        if (error.code === "auth/invalid-credential") {
          setError("password", {
            type: "manual",
            message: "Invalid email or password.",
          });
          setError("email", {
            type: "manual",
            message: "",
          });
        }
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 bg-[#f1f3fa] dark:bg-[#0c0e18] transition-colors">
      <div className="w-full max-w-md p-8 shadow-md rounded-xl bg-white dark:bg-[#1a1c2b] transition-colors">
        <h2 className="text-3xl md:text-4xl text-center font-bold text-[#435cd1] dark:text-[#8c9eee] mb-6 transition-colors">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block mb-1 font-medium text-[#0c0e18] dark:text-[#f1f3fa] transition-colors">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#435cd1] dark:focus:ring-[#8c9eee] bg-white dark:bg-[#121426] text-[#0c0e18] dark:text-[#f1f3fa] transition-colors"
              placeholder="admin@g.com"
            />
            {errors.email && (
              <p className="text-rose-700 mt-1 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium text-[#0c0e18] dark:text-[#f1f3fa] transition-colors">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum password length is six. So put more..",
                },
                pattern: {
                  value: /^[^A-Z]*$/,
                  message: "Do not use capital letters in password",
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#435cd1] dark:focus:ring-[#8c9eee] bg-white dark:bg-[#121426] text-[#0c0e18] dark:text-[#f1f3fa] transition-colors"
              placeholder="alamin123"
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <a className="text-sm text-[#435cd1] dark:text-[#8c9eee] hover:underline cursor-pointer transition-colors">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[#435cd1] dark:bg-[#4d6bf4] text-white py-2 rounded-md hover:bg-[#4d6bf4] dark:hover:bg-[#8c9eee] transition-colors"
          >
            Login
          </button>

          {/* Register Link */}
          <p className="text-center text-sm text-[#0c0e18] dark:text-[#f1f3fa] transition-colors">
            New to this website?{" "}
            <Link to={"/register"}>
              <button className="text-[#435cd1] dark:text-[#8c9eee] underline ml-1 transition-colors">
                Register
              </button>
            </Link>
          </p>
        </form>

        <div className="flex justify-between mt-4"></div>

        {/* Social Login */}
        <SocialLogin />
      </div>
    </div>
  );
};

export default Login;
