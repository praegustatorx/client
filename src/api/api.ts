import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterCredentials {
  email: string;
  name: string;
  password: string;
}

export interface ErrorResponse extends Error {
  message: string;
}

export const login = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  } catch (error: any) {
    const errorResponse: ErrorResponse = {
      message: error.response.data.message,
      name: error.name,
    };
    throw errorResponse;
  }
};

export const register = async (
  credentials: RegisterCredentials
): Promise<RegisterCredentials> => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, credentials);
    return response.data;
  } catch (error: any) {
    const errorResponse: ErrorResponse = {
      message: error.response.data.message,
      name: error.name,
    };
    throw errorResponse;
  }
};
