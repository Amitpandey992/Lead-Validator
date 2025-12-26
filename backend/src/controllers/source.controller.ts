import { NextFunction, Request, Response } from "express";
import * as sourceService from "../services/source.service";

const getUserId = (req: Request) => (req as any).user.id;

export const create = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = getUserId(req);
        const result = await sourceService.createSource(
            userId,
            req.body.sourceName
        );
        res.status(201).json(result);
    } catch (err) {
        next(err);
    }
};

export const list = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = getUserId(req);

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const result = await sourceService.getUserSources(userId, page, limit);

        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};
