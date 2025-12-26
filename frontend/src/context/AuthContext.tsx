import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/auth.service";
import { toast } from "react-toastify";
import type { User } from "../shared/interface";
import type {
    GenericResponse,
    LeadProceedResponse,
    LeadsResponse,
    SignupLoginResponse,
    UserSourceResponse,
    VerifyEmailResponse,
} from "../shared/types";
import { clearToken, getSavedToken, saveToken } from "../utils/storage";
import { SourceService } from "../services/source.service";
import { LeadService } from "../services/lead.service";

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (
        email: string,
        password: string
    ) => Promise<GenericResponse<SignupLoginResponse>>;
    signup: (
        name: string,
        email: string,
        password: string
    ) => Promise<GenericResponse<SignupLoginResponse>>;
    logout: () => void;
    isLoading: boolean;
    verifyEmail: (
        token: string
    ) => Promise<GenericResponse<VerifyEmailResponse>>;
    createSource: (sourceName: string) => Promise<GenericResponse<any>>;
    getUserSources: (
        page: number,
        limit: number
    ) => Promise<GenericResponse<UserSourceResponse>>;
    getLeads: (
        page: number,
        limit: number
    ) => Promise<GenericResponse<LeadsResponse>>;
    manualValidateLead: (
        sourceId: string,
        email: string,
        phone: string
    ) => Promise<GenericResponse<LeadProceedResponse>>;
    getLeadsBySource: (
        sourceId: string,
        page: number,
        limit: number
    ) => Promise<GenericResponse<LeadsResponse>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const restoreSession = () => {
        const savedToken = getSavedToken();
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        if (savedToken) {
            setToken(savedToken);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        restoreSession();
    }, []);

    const handleAuthSuccess = async (data: any) => {
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        setToken(data.accessToken);
        saveToken(data.accessToken);
    };

    const login = async (email: string, password: string) => {
        try {
            const response = await authService.login(email, password);
            handleAuthSuccess(response.data);
            return response;
        } catch (error: any) {
            throw error;
        }
    };

    const signup = async (name: string, email: string, password: string) => {
        try {
            const response = await authService.signup(name, email, password);
            handleAuthSuccess(response.data);
            return response;
        } catch (error: any) {
            throw error;
        }
    };

    const verifyEmail = async (token: string) => {
        try {
            const response = await authService.verifyEmail(token);
            handleAuthSuccess(response.data);
            return response;
        } catch (error: any) {
            throw error;
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        clearToken();
        toast.info("Logged out");
    };

    const createSource = async (sourceName: string) => {
        try {
            const response = await SourceService.create(sourceName);
            return response;
        } catch (error: any) {
            throw error;
        }
    };

    const getUserSources = async (page: number, limit: number) => {
        try {
            const response = await SourceService.list(page, limit);
            return response;
        } catch (error: any) {
            throw error;
        }
    };

    const getLeads = async (page: number, limit: number) => {
        try {
            const response = await LeadService.getMyLeads(page, limit);
            return response;
        } catch (error: any) {
            throw error;
        }
    };

    const manualValidateLead = async (
        sourceId: string,
        email: string,
        phone: string
    ) => {
        try {
            const response = await LeadService.manualValidateLead(
                sourceId,
                email,
                phone
            );
            return response;
        } catch (error: any) {
            throw error;
        }
    };

    const getLeadsBySource = async (
        sourceId: string,
        page: number,
        limit: number
    ) => {
        try {
            const response = await LeadService.getLeadsBySource(
                sourceId,
                page,
                limit
            );
            return response;
        } catch (error: any) {
            throw error;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                signup,
                logout,
                isLoading,
                verifyEmail,
                createSource,
                getUserSources,
                getLeads,
                manualValidateLead,
                getLeadsBySource,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
