import { Source } from "../models/Source";
import { Lead } from "../models/Lead";
import { AppError } from "../utils/AppError";
import { GenericResponse, LeadProceedResponse } from "../shared/types";
import mongoose, { PipelineStage } from "mongoose";

const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validatePhone = (phone: string) => {
    return /^\+?[\d\s-]{10,}$/.test(phone);
};

export const processLead = async (
    sourceId: string,
    apiKey: string,
    email: string,
    phone: string
): Promise<GenericResponse<LeadProceedResponse>> => {
    const source = await Source.findOne({ sourceId });

    console.log("lead service", source);
    if (!source) {
        throw new AppError("Invalid Source ID", 401);
    }

    if (source.apiKey !== apiKey) {
        throw new AppError("Invalid API Key", 401);
    }

    const userId = source.user.toString();

    let validationStatus: "valid" | "invalid" = "invalid";

    if (validateEmail(email) && validatePhone(phone)) {
        validationStatus = "valid";
    }

    const lead = await Lead.create({
        sourceId,
        email,
        phone,
        validationStatus,
        user: userId,
    });

    return {
        success: true,
        data: { lead },
        message: "Lead processed successfully",
    };
};

export const getAllUserLeads = async (
    userId: string,
    page: number = 1,
    limit: number = 10
): Promise<GenericResponse<any>> => {
    try {
        const skip = (page - 1) * limit;

        const pipeline: PipelineStage[] = [
            {
                $lookup: {
                    from: "sources",
                    localField: "sourceId",
                    foreignField: "sourceId",
                    as: "source",
                },
            },
            { $unwind: "$source" },
            { $match: { "source.user": new mongoose.Types.ObjectId(userId) } },
            { $sort: { createdAt: -1 } },
            {
                $facet: {
                    leads: [{ $skip: skip }, { $limit: limit }],
                    total: [{ $count: "count" }],
                },
            },
        ];

        const result = await Lead.aggregate(pipeline);

        const leads = result[0].leads;
        const totalItems = result[0].total[0]?.count || 0;
        const totalPages = Math.ceil(totalItems / limit);

        return {
            success: true,
            data: { leads, currentPage: page, totalPages, totalItems },
            message: "Leads retrieved successfully",
        };
    } catch (error: any) {
        return { success: false, data: null, message: error.message };
    }
};

export const processManualLead = async (
    sourceId: string,
    email: string,
    phone: string,
    userId: string
): Promise<GenericResponse<LeadProceedResponse | null>> => {
    try {
        const source = await Source.findOne({ sourceId, user: userId });

        if (!source) {
            throw new AppError("Invalid source for this user", 403);
        }

        let validationStatus: "valid" | "invalid" = "invalid";

        if (validateEmail(email) && validatePhone(phone)) {
            validationStatus = "valid";
        }

        const lead = await Lead.create({
            sourceId,
            email,
            phone,
            validationStatus,
            user: userId,
        });

        return {
            success: true,
            data: { lead },
            message: "Manual lead validated successfully",
        };
    } catch (error: any) {
        return {
            success: false,
            data: null,
            message: error.data?.response?.message || error.message,
        };
    }
};

export const getUserLeadsBySource = async (
    userId: string,
    sourceId: string,
    page: number = 1,
    limit: number = 10
): Promise<GenericResponse<any>> => {
    try {
        const skip = (page - 1) * limit;

        // 🔐 Ensure the source belongs to the user
        const source = await Source.findOne({ sourceId, user: userId });
        if (!source) {
            throw new AppError("Source not found for this user", 403);
        }

        const pipeline: PipelineStage[] = [
            { $match: { sourceId } },
            {
                $lookup: {
                    from: "sources",
                    localField: "sourceId",
                    foreignField: "sourceId",
                    as: "source",
                },
            },
            { $unwind: "$source" },
            { $sort: { createdAt: -1 } },
            {
                $facet: {
                    leads: [{ $skip: skip }, { $limit: limit }],
                    total: [{ $count: "count" }],
                },
            },
        ];

        const result = await Lead.aggregate(pipeline);

        const leads = result[0].leads;
        const totalItems = result[0].total[0]?.count || 0;
        const totalPages = Math.ceil(totalItems / limit);

        return {
            success: true,
            data: { leads, currentPage: page, totalPages, totalItems },
            message: "Leads filtered by source successfully",
        };
    } catch (error: any) {
        return {
            success: false,
            data: null,
            message: error.message,
        };
    }
};
