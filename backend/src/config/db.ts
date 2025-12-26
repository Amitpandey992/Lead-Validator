import mongoose from "mongoose";
import { config } from "./env";
import { logger } from "../logger/winstonLogger";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(config.mongoUri);
        logger.info(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error: any) {
        logger.error(`Error: ${error.message}`);
        process.exit(1);
    }
};
