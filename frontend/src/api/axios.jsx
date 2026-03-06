import axios from "axios";

// Log this once to see if Vite is actually picking it up
console.log("Axios Base URL Check:", import.meta.env.VITE_API_BASE_URL);

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000" ,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Recommended if you're using Cookies/Sessions
});

export default api;
