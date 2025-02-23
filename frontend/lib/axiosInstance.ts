import axios, { AxiosInstance } from "axios";
import { ENV_VARIABLES } from "./constants";

const axiosGoInstance: AxiosInstance = axios.create({
  baseURL: ENV_VARIABLES.MEIN_BE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosGoInstance;
