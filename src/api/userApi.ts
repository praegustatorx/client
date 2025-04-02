import axios from "axios";
import { useMutation } from "react-query";


export interface LoginCredentials {
    email: string;
    password: string;
}

export const login = async (
    credentials: LoginCredentials
): Promise<LoginCredentials> => {
    const response = await axios.post(
        "http://192.168.1.199:8000/auth/login",
        credentials
    );
    return response.data;
};

export const loginMutation = useMutation<LoginCredentials, Error, LoginCredentials>(
    login,
);