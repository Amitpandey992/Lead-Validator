import { NextFunction, Request, response, Response } from "express";
import * as authService from "../services/auth.service";

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await authService.registerUser(req.body);
        res.status(201).json(result);
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
        const result = await authService.verifyEmail(token as string);
        res.status(200).json(result);
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
        const result = await authService.loginUser(req.body);
        res.status(200).json(result);
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
        const result = await authService.resendVerification(req.body.email);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};
