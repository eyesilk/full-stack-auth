import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "/api",
});

instance.interceptors.request.use((config) => {
  return config;
});

export default instance;
