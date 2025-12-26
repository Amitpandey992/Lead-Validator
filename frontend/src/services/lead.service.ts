import { axiosInstance } from "../shared/axiosInstance";
import type {
    GenericResponse,
    LeadProceedResponse,
    LeadsResponse,
} from "../shared/types";

export const LeadService = {
    validateLeadPublicAPI: async ({
        sourceId,
        apiKey,
        email,
        phone,
    }: {
        sourceId: string;
        apiKey: string;
        email: string;
        phone: string;
    }): Promise<GenericResponse<LeadProceedResponse>> => {
        const response = await axiosInstance.post(
            "/leads/public/validate-lead",
            {
                sourceId,
                apiKey,
                email,
                phone,
            }
        );
        return response.data;
    },

    getMyLeads: async (
        page: number,
        limit: number
    ): Promise<GenericResponse<LeadsResponse>> => {
        const response = await axiosInstance.get(
            `/leads?page=${page}&limit=${limit}`
        );
        return response.data;
    },

    manualValidateLead: async (
        sourceId: string,
        email: string,
        phone: string
    ): Promise<GenericResponse<LeadProceedResponse>> => {
        const response = await axiosInstance.post("/leads/manual", {
            sourceId,
            email,
            phone,
        });
        return response.data;
    },

    getLeadsBySource: async (
        sourceId: string,
        page: number,
        limit: number
    ): Promise<GenericResponse<LeadsResponse>> => {
        const response = await axiosInstance.get(
            `/leads/source/${sourceId}?page=${page}&limit=${limit}`
        );
        return response.data;
    },
};
