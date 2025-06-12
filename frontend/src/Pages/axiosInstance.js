import axios from "axios";
import { store } from "./store"; // Import your store directly

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  timeout: 10000, // Optional: Timeout after 10 seconds
  headers: {
    "Content-Type": "application/json",
    // Add other headers if needed (e.g., Authorization)
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Access user from Redux store directly using getState()
    const user = store.getState()?.user;


    if (user) {
      // If the user exists, set the Authorization header or any other headers
      const basicAuth = "Basic " + btoa(`${user.username}:${user.password}`);
      config.headers["Authorization"] = basicAuth; // Add your authorization header
    }

    return config;
  },
  (error) => {
    console.log("Error with the request:", error);
    return Promise.reject(error);
  }
);

// Uncomment and add your response interceptor if needed
// axiosInstance.interceptors.response.use(
//   (response) => {
//     console.log('Response received:', response);
//     return response;
//   },
//   (error) => {
//     console.log('Error with response:', error);
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
