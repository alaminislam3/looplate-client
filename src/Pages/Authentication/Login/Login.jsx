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
    setError, // ✅ এটা যোগ করলাম manual error দেখানোর জন্য
    formState: { errors }, // ✅ form-এর error গুলো ধরে রাখতে
  } = useForm();

  const onsubmit = (data) => {
    // console.log(data.email, data.password);
    singIn(data.email, data.password)
      .then(async (result) => {
        const loggedUser = { email: result.user.email };

        const tokenRes = await axios.post(
          "https://looplate-server.vercel.app/jwt",
          loggedUser
        );

        localStorage.setItem("access-token", tokenRes.data.token);

        // ✅ 3. Navigate
        navigate(from);
      })
      .catch((error) => {
        console.log(error);

        // ✅ যদি password ভুল হয়, তাহলে এইখানে error দেখাবো
        if (error.code === "auth/invalid-credential") {
          setError("password", {
            type: "manual",
            message: "Invalid email or password.",
          });
        }

        // ✅ Optional: user না পাইলে email field এ error দেখাতে পারো
        if (error.code === "auth/invalid-credential") {
          setError("email", {
            type: "manual",
            message: "",
          });
        }
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 bg-gray-50">
      <div className="w-full max-w-md p-8 shadow-md rounded-xl bg-white">
        <h2 className="text-3xl md:text-4xl text-center font-bold text-primary mb-6">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Email"
            />
            {/* ✅ যদি email ভুল হয় */}
            {errors.email && (
              <p className="text-rose-700 mt-1 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
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
                  message: "Do not use capital letters in password", // ✅ এটা লাগবেই!
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Password"
            />
          </div>

          <div className="text-right">
            <a className="text-sm text-primary hover:underline cursor-pointer">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Login
          </button>

          <p className="text-center text-sm">
            New to this website?{" "}
            <Link to={"/register"}>
              <button className="text-primary underline ml-1">Register</button>
            </Link>
          </p>
        </form>
        <SocialLogin />
      </div>
    </div>
  );
};

export default Login;
