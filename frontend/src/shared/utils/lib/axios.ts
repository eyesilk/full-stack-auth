import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: process.env.SERVER_URL,
});

instance.interceptors.request.use((config) => {
  return config;
});

export default instance;
