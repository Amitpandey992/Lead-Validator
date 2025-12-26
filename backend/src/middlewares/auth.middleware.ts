import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { AppError } from "../utils/AppError";

export const protect = (req: Request, res: Response, next: NextFunction) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return next(new AppError("Not authorized, please login", 401));
    }

    try {
        const decoded = verifyToken(token);
        (req as any).user = decoded;
        next();
    } catch (err) {
        return next(new AppError("Invalid token", 401));
    }
};
