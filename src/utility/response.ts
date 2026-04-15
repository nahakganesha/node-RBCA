export interface ApiResponse<T> {
  success: boolean;
  status: string;
  message: string;
  data?: T;
  error?: string;
}

export function successResponse<T>(
  message: string,
  status: string,
  data?: T
): ApiResponse<T> {
  return {
    success: true,
    status: "success",
    message,
    data,
  };
}

export function errorResponse(
  message: string,
  status: string,
  error: string
): ApiResponse<null> {
  return {
    success: false,
    status: "error",
    message,
    error,
  };
}
