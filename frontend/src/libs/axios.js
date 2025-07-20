import axios from "axios";

// const BACKEND_URL =
//   process.env.REACT_ENV == "development"
//     ? process.env.LOCAL_URL
//     : process.env.PRODUCTION_URL;

export const BACKEND_URL = "http://localhost:5000";

export const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});
