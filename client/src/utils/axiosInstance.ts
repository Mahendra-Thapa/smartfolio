import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosRequestHeaders,
} from "axios";
import { getTokenFromCookies } from "./cookies";

let cachedToken: string | null = null;

const fetchToken = async (): Promise<string | null> => {
  if (cachedToken) return cachedToken;

  const tokenData = await getTokenFromCookies();
  cachedToken = tokenData?.token ?? null;
  return cachedToken;
};

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_BASE_URL, // ✅ FIX
  headers: { "Content-Type": "application/json" },
});

export const axiosMultipartInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_BASE_URL, // ✅ FIX
  headers: { "Content-Type": "multipart/form-data" },
});

export const axiosAuthInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_BASE_URL, // ✅ FIX
  headers: { "Content-Type": "application/json" },
});

const addAuthInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const token = await fetchToken();

      if (token) {
        if (!config.headers) {
          config.headers = {} as AxiosRequestHeaders;
        }
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    error => Promise.reject(error)
  );
};

addAuthInterceptor(axiosAuthInstance);
addAuthInterceptor(axiosMultipartInstance);
