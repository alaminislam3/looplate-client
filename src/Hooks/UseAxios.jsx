import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `https://looplate-server.vercel.app`,
});

const UseAxios = () => {
  return axiosInstance;
};

export default UseAxios;
