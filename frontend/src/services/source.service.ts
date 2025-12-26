import { axiosInstance } from "../shared/axiosInstance";

export const SourceService = {
    create: async (sourceName: string) => {
        const response = await axiosInstance.post(`/sources`, { sourceName });
        return response.data;
    },
    list: async (page: number, limit: number) => {
        const response = await axiosInstance.get(
            `/sources?page=${page}&limit=${limit}`
        );
        return response.data;
    },
};
