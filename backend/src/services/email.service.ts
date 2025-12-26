import nodemailer from "nodemailer";
import { config } from "../config/env";
import { logger } from "../logger/winstonLogger";
import EmailTemplates from "../utils/emailTemplates";

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: config.emailUser,
        pass: config.emailPass,
    },
});

export const sendVerificationEmail = async (to: string, token: string) => {
    if (!config.emailUser || !config.emailPass) {
        logger.warn(
            "Email credentials not provided. Skipping email sending. Token: " +
                token
        );
        return;
    }

    const url = `${config.clientUrl}/verify-email?token=${token}`;

    const mailOptions = {
        from: `"LeadValidate" <${config.emailUser}>`,
        to,
        subject: "Verify your email",
        html: EmailTemplates.verificationEmail(url),
    };

    await transporter.sendMail(mailOptions);
    logger.info(`Verification email sent to ${to}`);
};

export const sendWelcomeEmail = async (to: string, name: string) => {
    if (!config.emailUser || !config.emailPass) {
        logger.warn("Email credentials not provided. Skipping welcome email.");
        return;
    }

    const mailOptions = {
        from: `"LeadValidate" <${config.emailUser}>`,
        to,
        subject: "Welcome to LeadValidate",
        html: EmailTemplates.welcomeEmail(name),
    };

    await transporter.sendMail(mailOptions);
};
