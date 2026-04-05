import axios from "axios";

const client = axios.create({
  // All backend routes are mounted under /api — this prefix is required
  baseURL: "https://ai-marketing-engine-lvty.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;
