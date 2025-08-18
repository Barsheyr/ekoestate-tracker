// import axios from "axios";

// const customFetch = axios.create({
//   baseURL: "/api/v1",
// });

// export default customFetch;

// import axios from "axios";

// const customFetch = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   withCredentials: true,
// });

// export default customFetch;

// In your customFetch.js (client side)
import axios from "axios";

const customFetch = axios.create({
  baseURL: "https://ekoestate-tracker-backend.vercel.app/api/v1", // Update with your server URL
  withCredentials: true, // This sends cookies
});

// Response interceptor - save token when login returns it
customFetch.interceptors.response.use(
  (response) => {
    // If login response has token, save it
    if (response.data.token) {
      localStorage.setItem("authToken", response.data.token);
    }
    return response;
  },
  (error) => Promise.reject(error)
);

// Request interceptor - send token in header as backup
customFetch.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default customFetch;
