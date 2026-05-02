// services/api.js
import axios from "axios";
import toast from "react-hot-toast";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// global error handler
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const msg = error.response?.data?.message || "Something went wrong ❌";
    toast.error(msg);
    return Promise.reject(error);
  },
);
