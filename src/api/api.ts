import axios from "axios";
import { Ingredient } from "../constants/Pantry";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  loginUser: {
    name: string;
    email: string;
  };
}

export interface RegisterCredentials {
  email: string;
  name: string;
  password: string;
}

export interface ErrorResponse extends Error {
  message: string;
}

export interface SendMessage {
  chatId: string;
  message: string;
}

export interface MessageResponse {
  message: string;
}

export interface SendImage {
  image: any;
}

export interface FetchPantryResponse {
  userId: string;
  ingredients: Ingredient[];
}

export interface PantryItemInput {
  brand: string;
  category: string;
  quantityUnit: string;
  portionUnit: string;
  expirationDate: string;
  isKCAL: boolean;
  calories: number;
  portion: string;
  protein: number;
  fat: number;
  carbohydrates: number;
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

export const sendMessage = async (
  message: SendMessage
): Promise<MessageResponse> => {
  try {
    const response = await axios.post(`${API_URL}/chat/`, message);
    return response.data;
  } catch (error: any) {
    const errorResponse: ErrorResponse = {
      message: error.response.data.message,
      name: error.name,
    };
    throw errorResponse;
  }
};

export const uploadImage = async (formData: any): Promise<MessageResponse> => {
  console.log("formData", formData);
  try {
    const response = await axios.post(`${API_URL}/file/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("formData", formData);
    return response.data;
  } catch (error: any) {
    const errorResponse: ErrorResponse = {
      message: error.response.data.message,
      name: error.name,
    };
    console.log("error", errorResponse.message);
    throw errorResponse;
  }
};

export const fetchPantry = async (
  userId: string
): Promise<FetchPantryResponse> => {
  try {
    const path = `${API_URL}/pantry/${userId}`;
    console.log(path, "path");
    const response = await axios.get(path);
    return response.data;
  } catch (error: any) {
    const errorResponse: ErrorResponse = {
      message: error.response.data.message,
      name: error.name,
    };
    throw errorResponse;
  }
};

export const fetchCookbook = async (): Promise<RegisterCredentials> => {
  try {
    const response = await axios.get("");
    return response.data;
  } catch (error: any) {
    const errorResponse: ErrorResponse = {
      message: error.response.data.message,
      name: error.name,
    };
    throw errorResponse;
  }
};

export const putIngredientInPantry = async (
  data: PantryItemInput
): Promise<any> => {
  console.log("data", data);
  try {
    const path = `${API_URL}/pantry/user123/ingredients`;
    const response = await axios.put(path, data);
    return response.data;
  } catch (error: any) {
    const errorResponse: ErrorResponse = {
      message: error.response.data.message,
      name: error.name,
    };
    throw errorResponse;
  }
};

export const deleteIngredientFromPantry = async ({
  userId,
  pantryItemId,
}: {
  userId: string;
  pantryItemId: string;
}) => {
  try {
    const path = `${API_URL}/pantry/${userId}/ingredients/${pantryItemId}`;
    const response = await axios.delete(path);
    return response.data;
  } catch (error: any) {
    const errorResponse: ErrorResponse = {
      message: error.response.data.message,
      name: error.name,
    };
    throw errorResponse;
  }
};

export const uploadImageToBePredicted = async (
  formData: FormData
): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/model/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Error processing prediction");
    }

    return result;
  } catch (error: any) {
    throw new Error(error.message || "Upload failed");
  }
};
