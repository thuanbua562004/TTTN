import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:3000", // Đổi theo backend của bạn
  headers: { "Content-Type": "application/json" },
});

// Thêm Interceptor để tự động gắn token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
