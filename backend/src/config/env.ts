import dotenv from "dotenv";

dotenv.config();

function required(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing environment variable: ${name}`);
    }
    return value;
}

export const config = {
    port: required("PORT"),
    mongoUri: required("MONGO_URI"),
    jwtSecret: required("JWT_SECRET"),
    nodeEnv: required("NODE_ENV"),
    emailUser: required("EMAIL_USER"),
    emailPass: required("EMAIL_PASS"),
    clientUrl: required("CLIENT_URL"),
};
