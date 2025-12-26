import { NextFunction, Request, response, Response } from "express";
import * as authService from "../services/auth.service";

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await authService.registerUser(req.body);
        res.status(201).json({
            success: true,
            message: "User registered. Please check email for verification.",
            data: { user },
        });
    } catch (err) {
        next(err);
    }
};

export const verify = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { token } = req.query;
        const user = await authService.verifyEmail(token as string);
        res.status(200).json({
            success: true,
            message: "Email verified successfully",
            data: user,
        });
    } catch (err) {
        next(err);
    }
};

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { user, accessToken } = await authService.loginUser(req.body);
        res.status(200).json({
            success: true,
            data: { user, accessToken },
            message: "User logged in successfully",
        });
    } catch (err) {
        next(err);
    }
};

export const resendVerify = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await authService.resendVerification(req.body.email);
        res.status(200).json({
            success: true,
            message: "Verification email sent",
        });
    } catch (err) {
        next(err);
    }
};
