import mongoose, { Schema } from "mongoose";
import { ILead } from "../shared/interface";

const LeadSchema: Schema = new Schema(
    {
        sourceId: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        validationStatus: {
            type: String,
            enum: ["valid", "invalid"],
            required: true,
        },
        user: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export const Lead = mongoose.model<ILead>("Lead", LeadSchema);
