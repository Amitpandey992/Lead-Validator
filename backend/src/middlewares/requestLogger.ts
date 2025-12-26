import { Request, Response, NextFunction } from "express";
import { logger } from "../logger/winstonLogger";

export const requestLogger = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { method, url } = req;
    const requestId = req.requestId;

    // Log request start
    logger.info(`Incoming Request: ${method} ${url}`, { requestId });

    const start = Date.now();

    res.on("finish", () => {
        const duration = Date.now() - start;
        logger.info(
            `Request Completed: ${method} ${url} ${res.statusCode} - ${duration}ms`,
            {
                requestId,
                statusCode: res.statusCode,
                duration,
            }
        );
    });

    next();
};
