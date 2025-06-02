import axios from 'axios';
import type { ApiClient, ApiError } from './types';

const axiosInstance = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosApiClient: ApiClient = {
  async get<T>(url: string, query?: Record<string, unknown>) {
    try {
      const config = query ? { params: query } : undefined;
      const response = await axiosInstance.get<T>(url, config);
      return { data: response.data };
    } catch (error: unknown) {
      return { error: convertToApiError(error) };
    }
  },
  async post<T, RequestData>(url: string, data: RequestData) {
    try {
      const response = await axiosInstance.post<T>(url, data);
      return { data: response.data };
    } catch (error: unknown) {
      return { error: convertToApiError(error) };
    }
  },
  async put<T, RequestData>(url: string, data: RequestData) {
    try {
      const response = await axiosInstance.put<T>(url, data);
      return { data: response.data };
    } catch (error: unknown) {
      return { error: convertToApiError(error) };
    }
  },
  async delete<T>(url: string) {
    try {
      const response = await axiosInstance.delete<T>(url);
      return { data: response.data };
    } catch (error: unknown) {
      return { error: convertToApiError(error) };
    }
  },
};

function convertToApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error) && error?.response) {
    return {
      status: error.response.status,
      message: error.message,
      error,
    };
  }
  return {
    status: undefined,
    message: '予期せぬエラーが発生しました',
    error,
  };
}
