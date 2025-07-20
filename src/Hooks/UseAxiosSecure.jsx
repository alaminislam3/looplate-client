import axios from "axios";
import { useNavigate } from "react-router";
import UseAuth from "./UseAuth";

const axiosSecure = axios.create({
  baseURL: `http://localhost:5000/`,
});

const UseAxiosSecure = () => {
  const { logout } = UseAuth();
  const navigate = useNavigate();

  axiosSecure.interceptors.request.use(
    (config) => {
      // ✅ Clear bearer accessToken replaced by token from localStorage
      const token = localStorage.getItem("access-token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      const status = error.response?.status;  

      if (status === 403) {
        navigate("/forbidden");
      } else if (status === 401) {
        logout()
          .then(() => {
            navigate("/login");
          })
          .catch(() => {});
      }
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default UseAxiosSecure;
