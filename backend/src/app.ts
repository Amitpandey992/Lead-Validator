import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { requestIdObj } from "./middlewares/requestId";
import { requestLogger } from "./middlewares/requestLogger";
import { logger } from "./logger/winstonLogger";
import { config } from "./config/env";
import { AppError } from "./utils/AppError";

// Routes
import authRoutes from "./routes/auth.routes";
import sourceRoutes from "./routes/source.routes";
import leadRoutes from "./routes/lead.routes";

dotenv.config();

const app = express();

// Database
connectDB();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(requestIdObj);
app.use(requestLogger);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/sources", sourceRoutes);
app.use("/api/leads", leadRoutes);

// 404
app.use((req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    logger.error(message, {
        requestId: req.requestId,
        stack: err.stack,
    });

    res.status(statusCode).json({
        status: err.status || "error",
        message,
    });
});

const PORT = config.port;

app.listen(PORT, () => {
    logger.info(`Server running in ${config.nodeEnv} mode on port ${PORT}`);
});

export default app;
