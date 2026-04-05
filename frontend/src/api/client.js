import axios from "axios";

const client = axios.create({
  baseURL: "https://ai-marketing-engine-lvty.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;
