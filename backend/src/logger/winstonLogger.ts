import winston from "winston";

const { combine, timestamp, printf, colorize, json } = winston.format;

const logFormat = printf(
    ({ level, message, timestamp, requestId, ...meta }) => {
        return `${timestamp} [${requestId || "N/A"}] ${level}: ${message} ${
            Object.keys(meta).length ? JSON.stringify(meta) : ""
        }`;
    }
);

export const logger = winston.createLogger({
    level: "info",
    format: combine(timestamp(), json()),
    transports: [
        new winston.transports.File({
            filename: "logs/error.log",
            level: "error",
        }),
        new winston.transports.File({ filename: "logs/combined.log" }),
    ],
});

if (process.env.NODE_ENV !== "production") {
    logger.add(
        new winston.transports.Console({
            format: combine(
                colorize(),
                timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
                logFormat
            ),
        })
    );
}
