import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

declare global {
    namespace Express {
        interface Request {
            requestId?: string;
        }
    }
}

export const requestIdObj = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = uuidv4();
    req.requestId = id;
    res.setHeader("X-Request-Id", id);
    next();
};
