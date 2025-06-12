export type ApiError = {
  status: number | undefined;
  message: string;
  error: unknown;
};
export type ApiResponse<T> =
  | {
      data: T;
      error?: undefined;
    }
  | { data?: undefined; error: ApiError };

export type ApiClient = {
  get<T>(url: string, query?: Record<string, unknown>): Promise<ApiResponse<T>>;
  post<T, RequestData>(url: string, data: RequestData): Promise<ApiResponse<T>>;
  put<T, RequestData>(url: string, data: RequestData): Promise<ApiResponse<T>>;
  delete<T>(url: string): Promise<ApiResponse<T>>;
};
