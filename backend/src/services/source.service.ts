import { Source } from "../models/Source";
import { v4 as uuidv4 } from "uuid";
import { AppError } from "../utils/AppError";
import { GenericResponse, SourceResponseForCreate } from "../shared/types";

export const createSource = async (
    userId: string,
    sourceName: string
): Promise<GenericResponse<SourceResponseForCreate | null>> => {
    try {
        if (!userId) {
            throw new AppError("User ID is required", 400);
        }
        if (!sourceName) {
            throw new AppError("Source name is required", 400);
        }

        const sourceId = uuidv4();
        const apiKey = "vk_" + uuidv4().replace(/-/g, "");

        const source = await Source.create({
            user: userId,
            sourceName,
            sourceId,
            apiKey,
        });

        return {
            success: true,
            data: source,
            message: "Source created successfully",
        };
    } catch (error: any) {
        return {
            success: false,
            data: null,
            message: error.response?.data?.message || error.message,
        };
    }
};

export const getUserSources = async (
    userId: string,
    page: number = 1,
    limit: number = 10
): Promise<GenericResponse<any>> => {
    try {
        const skip = (page - 1) * limit;

        const [sources, totalItems] = await Promise.all([
            Source.find({ user: userId })
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 }),
            Source.countDocuments({ user: userId }),
        ]);

        const totalPages = Math.ceil(totalItems / limit);

        return {
            success: true,
            data: {
                sources,
                currentPage: page,
                totalPages,
                totalItems,
            },
            message: "Sources retrieved successfully",
        };
    } catch (error: any) {
        return {
            success: false,
            data: null,
            message: error.response?.data?.message || error.message,
        };
    }
};


export const getSourceById = async (sourceId: string, userId: string) => {
    try {
        const source = await Source.findOne({ _id: sourceId, user: userId });
        if (!source) throw new AppError("Source not found", 404);

        return {
            success: true,
            data: source,
            message: "Source retrieved successfully",
        };
    } catch (error: any) {
        return {
            success: false,
            data: null,
            message: error.response?.data?.message || error.message,
        };
    }
};
