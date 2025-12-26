import mongoose, { Schema, Document } from "mongoose";
import { ISource } from "../shared/interface";

const SourceSchema: Schema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        sourceName: {
            type: String,
            required: true,
        },
        sourceId: {
            type: String,
            required: true,
            unique: true,
        },
        apiKey: {
            type: String,
            required: true,
            unique: true,
        },
    },
    { timestamps: true }
);

export const Source = mongoose.model<ISource>("Source", SourceSchema);
