import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { useContext } from "react";
import SocialLogin from "../SocialLogin/SocialLogin";
import { Authcontext } from "../../../Context/AuthContext";

const Login = () => {
  const { singIn } = useContext(Authcontext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onsubmit = (data) => {
    console.log(data.email, data.password);
    singIn(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        navigate(from);
      })
      .catch((error) => {
        console.log(error);
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
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Email"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-rose-700 mt-1 text-sm">
                Wait! Where is your password?
              </p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-rose-700 mt-1 text-sm">
                Minimum password length is six. So put more..
              </p>
            )}
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

          <SocialLogin />
        </form>
      </div>
    </div>
  );
};

export default Login;
