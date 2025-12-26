import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    isVerified: boolean;
    verificationToken?: string;
    createdAt: Date;
}

export interface ILead extends Document {
    sourceId: string;
    email: string;
    phone: string;
    validationStatus: "valid" | "invalid";
    validationDetails?: any;
    user: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ISource extends Document {
    user: mongoose.Types.ObjectId;
    sourceName: string;
    sourceId: string;
    apiKey: string;
    createdAt: Date;
    updatedAt: Date;
}
