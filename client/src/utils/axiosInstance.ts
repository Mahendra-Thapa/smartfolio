import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { getTokenFromCookies } from "./cookies";

let cachedToken: string | null = null;

// Fetch token from cookies or cache
const fetchToken = async (): Promise<string | null> => {
  if (cachedToken) return cachedToken;

  const tokenData = await getTokenFromCookies(); // { token, email, role } | null
  cachedToken = tokenData?.token ?? null;
  return cachedToken;
};

// Axios instances
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const axiosMultipartInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: { "Content-Type": "multipart/form-data" },
});

export const axiosAuthInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Add interceptor to attach JWT token
const addAuthInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const token = await fetchToken();

      if (token) {
        //  Use AxiosRequestHeaders type
        if (!config.headers) {
          config.headers = {} as AxiosRequestHeaders;
        }

        config.headers["Authorization"] = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );
};

// Apply interceptor
addAuthInterceptor(axiosAuthInstance);
addAuthInterceptor(axiosMultipartInstance);
