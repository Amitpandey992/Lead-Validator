import { axiosInstance } from "../shared/axiosInstance";
import type {
    GenericResponse,
    SignupLoginResponse,
    VerifyEmailResponse,
} from "../shared/types";

export const authService = {
    login: async (
        email: string,
        password: string
    ): Promise<GenericResponse<SignupLoginResponse>> => {
        const response = await axiosInstance.post("/auth/login", {
            email,
            password,
        });
        return response.data;
    },
    signup: async (
        name: string,
        email: string,
        password: string
    ): Promise<GenericResponse<SignupLoginResponse>> => {
        const response = await axiosInstance.post("/auth/signup", {
            name,
            email,
            password,
        });
        return response.data;
    },
    verifyEmail: async (
        token: string
    ): Promise<GenericResponse<VerifyEmailResponse>> => {
        const response = await axiosInstance.get(
            `/auth/verify-email?token=${token}`
        );
        return response.data;
    },
    resendVerify: async (email: string): Promise<GenericResponse<any>> => {
        const response = await axiosInstance.post("/auth/resend-verify", {
            email,
        });
        return response.data;
    },
};
