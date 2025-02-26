import axiosInstance from "./axiosInstance";
import { AxiosRequestConfig } from "axios";

const useApi = () => {
  const callApi = async (config: AxiosRequestConfig) => {
    try {
      const response = await axiosInstance({
        method: config.method,
        url: config.url,
        data: config?.data,
        ...config,
      });
      return response?.data;
    } catch (error: unknown) {
      console.log(error);
      throw error;
    }
  };

  return { callApi };
};

export default useApi;
