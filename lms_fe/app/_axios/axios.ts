import axios, { AxiosResponse } from "axios";

axios.interceptors.request.use(
  (request) => {
    request.baseURL = `/api/v1`;
    // request.baseURL = `http://localhost:1323/api/v1`;
    request.headers["Accept"] = `application/json`;
    request.validateStatus = () => true;
    return Promise.resolve(request);
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const throwResponse = (res: AxiosResponse) => {
  const { message } = res.data;
  if (!Array.isArray(message)) {
    throw new Error(message);
  }
  const text = message.reduce((result: string, item: string) => {
    return `${result}${item}\n`;
  }, "");
  throw new Error(text);
};

export default axios;
