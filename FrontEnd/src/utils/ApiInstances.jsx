import axios from "axios";

const baseUrl = "http://localhost:4000";

const api = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

export default api

