import Axios, { AxiosInstance } from "axios";
import { message } from "antd";

import { store } from 'store/rootStore';

interface ErrorResponseData {
  message?: string;
  error?: any;
}
class Http {
  private readonly axios: AxiosInstance;
  constructor() {
    this.axios = Axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true,
    });

    this.axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (!error.response) {
          store.dispatch({
            type: 'user/setHasConnection',
            payload: false,
          });
          return null;
        } else if (error.response.status === 401) {
          message.error("You are not authenticated");
          store.dispatch({
            type: 'user/setUser',
            payload: null,
          });
        }
        const data: ErrorResponseData = error.response.data;
        throw data.message || data.error || data || error.response;
      }
    );
  }

  get<T>(url: string) {
    return this.axios.get<T>(url);
  }
  post<T>(url: string, data?: any) {
    return this.axios.post<T>(url, data);
  }
  put<T>(url: string, data?: any) {
    return this.axios.put<T>(url, data);
  }
  delete<T>(url: string) {
    return this.axios.delete<T>(url);
  }
}

const http = new Http();

export default http;
