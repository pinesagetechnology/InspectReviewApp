import axios from "axios";
import Cookies from "js-cookie";

class InspectionApiService {
  constructor() {
    // Create axios instance with default config
    this.api = axios.create({
      baseURL: "https://ps-inspectionflow-api-fqete9bpf9b8fkc6.centralus-01.azurewebsites.net",
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

  // Inspection APIs
  async getInspectionList() {
    try {
      const response = await this.api.get("/api/Inspection/list");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getStructureList() {
    try {
      const response = await this.api.get("/api/Structure/list");
      return response.data;
    } catch (error) {
      throw error;
    }
  }


}

// Create and export a singleton instance
const inspectionApiService = new InspectionApiService();
export default inspectionApiService; 