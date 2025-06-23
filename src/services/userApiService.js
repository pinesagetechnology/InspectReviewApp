import axios from "axios";
import Cookies from "js-cookie";

class UserApiService {
  constructor() {
    // Create axios instance with default config
    this.api = axios.create({
      baseURL: "https://ps-usermanagement-api-gufbchhve3gjawbe.centralus-01.azurewebsites.net",
    });

    // Add request interceptor to include auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = Cookies.get("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          Cookies.remove("token");
          Cookies.remove("refreshToken");
          // Redirect to login if needed
          window.location.href = "/";
        }
        return Promise.reject(error);
      }
    );
  }

  // Get auth token
  getToken() {
    return Cookies.get("token");
  }

  // Set auth tokens
  setTokens(token, refreshToken) {
    Cookies.set("token", token);
    Cookies.set("refreshToken", refreshToken);
  }

  // Remove auth tokens
  removeTokens() {
    Cookies.remove("token");
    Cookies.remove("refreshToken");
  }

  // User Authentication APIs
  async login(email, password, remoteIpAddress) {
    try {
      const response = await this.api.post("/api/User/login", {
        email,
        password,
        remoteIpAddress,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async logout(userId, accessToken) {
    try {
      const response = await this.api.post(`/api/User/logout?userId=${userId}&accessToken=${accessToken}`, null);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getUserList() {
    try {
      const response = await this.api.get("/api/User/list");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // External APIs
  async getPublicIP() {
    try {
      const response = await axios.get("https://api.ipify.org?format=json");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Helper method to find user by email
  findUserByEmail(userList, email) {
    return userList.find((user) => user.email === email);
  }
}

// Create and export a singleton instance
const userApiService = new UserApiService();
export default userApiService; 