import { NextFunction, Request, Response } from "express";
import * as leadService from "../services/lead.service";

//public api
export const validateAndCreate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { sourceId, apiKey, email, phone } = req.body;

        const result = await leadService.processLead(
            sourceId,
            apiKey,
            email,
            phone
        );
        res.status(201).json(result);
    } catch (err) {
        next(err);
    }
};

export const manualValidateLead = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { sourceId, email, phone } = req.body;
        const userId = (req as any).user.id;

        const result = await leadService.processManualLead(
            sourceId,
            email,
            phone,
            userId
        );

        res.status(201).json(result);
    } catch (err) {
        next(err);
    }
};

// private api for dashboard
export const getMyLeads = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = (req as any).user.id;
        const result = await leadService.getAllUserLeads(userId);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};


export const getLeadsBySource = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user.id;
        const { sourceId } = req.params;
        const { page = 1, limit = 10 } = req.query;

        const result = await leadService.getUserLeadsBySource(
            userId,
            sourceId,
            Number(page),
            Number(limit)
        );

        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

