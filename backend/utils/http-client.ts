import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

/**
 * Sends an HTTP request using Axios.
 * @param httpRequestObject - The request configuration object.
 * @returns A Promise resolving to the Axios response.
 */
const httpClient = async (
  config: AxiosRequestConfig
): Promise<AxiosResponse> => {
  try {
    const response = await axios(config);
    return response?.data;
  } catch (error) {
    throw error;
  }
};

export default httpClient;
