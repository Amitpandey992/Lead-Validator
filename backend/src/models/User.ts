import mongoose, { Schema } from "mongoose";
import { IUser } from "../shared/interface";

const UserSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: 2,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters"],
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        verificationToken: {
            type: String,
        },
        verificationTokenExpires: {
            type: Date,
        },
    },
    { timestamps: true }
);

export const User = mongoose.model<IUser>("User", UserSchema);
