import axios from "axios";

const api = axios.create({
  baseURL: "https://campusconnect-backend-t2hl.onrender.com/api"
});

export default api;