import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080",   // <- Spring Boot default
  withCredentials: true,               // we use session cookie
  timeout: 15000,
});

// helpful logging to see real cause
api.interceptors.response.use(
  (r) => r,
  (err) => {
    console.error("API error:", {
      url: err.config?.url,
      method: err.config?.method,
      message: err.message,
      status: err.response?.status,
      data: err.response?.data,
    });
    return Promise.reject(err);
  }
);

export const authApi = {
  register: (payload) => api.post("/api/auth/register", payload),
  login: (email, password) => api.post("/api/auth/login", { email, password }),
  requestOtp: (channel) => api.post("/api/auth/request-otp", { channel }),
  verifyOtp: (code) => api.post("/api/auth/verify-otp", { code }),
  me: () => api.get("/api/auth/me"),
  logout: () => api.post("/api/auth/logout"),
};
