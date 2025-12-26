import bcrypt from "bcryptjs";
import { User } from "../models/User";
import { AppError } from "../utils/AppError";
import { sendVerificationEmail, sendWelcomeEmail } from "./email.service";
import { v4 as uuidv4 } from "uuid";
import { generateToken } from "../utils/jwt";
import { IUser } from "../shared/interface";

export const registerUser = async (userData: IUser) => {
    const { name, email, password } = userData;

    const existingUser = await User.findOne({ email }).select("-password");
    if (existingUser) {
        throw new AppError("Email already in use", 400);
    }

    const hashedPassword = await bcrypt.hash(password!, 12);
    const verificationToken = uuidv4();

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        verificationToken,
        isVerified: false,
    });

    await sendVerificationEmail(email!, verificationToken);

    return user;
};

export const verifyEmail = async (token: string) => {
    const user = await User.findOne({ verificationToken: token }).select(
        "-password"
    );
    if (!user) {
        throw new AppError("Invalid or expired token", 400);
    }

    user.isVerified = true;
    user.verificationToken = "";
    await user.save();

    await sendWelcomeEmail(user.email, user.name);
    const accessToken = generateToken(user._id as unknown as string);

    return { user, accessToken };
};

export const loginUser = async (userData: Partial<IUser>) => {
    const { email, password } = userData;

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await bcrypt.compare(password!, user.password!))) {
        throw new AppError("Invalid credentials", 401);
    }

    if (!user.isVerified) {
        throw new AppError("Please verify your email first", 401);
    }

    const accessToken = generateToken(user._id as unknown as string);
    return { user, accessToken };
};

export const resendVerification = async (email: string) => {
    const user = await User.findOne({ email }).select("-password");
    if (!user) throw new AppError("User not found", 404);
    if (user.isVerified) throw new AppError("User already verified", 400);

    const verificationToken = uuidv4();
    user.verificationToken = verificationToken;
    await user.save();

    await sendVerificationEmail(user.email, verificationToken);
    const accessToken = generateToken(user._id as unknown as string);

    return { user, accessToken };
};
