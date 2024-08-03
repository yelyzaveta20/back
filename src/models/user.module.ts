import mongoose from "mongoose";
import {RoleEnum} from "../enums/enums.role";
import {IUser} from "../interface/userInterface";
const { Schema } = mongoose;

const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        age: { type: Number, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        phone: { type: String, required: false },
        role: {
            type: String,
            enum: RoleEnum,
            required: true,
            default: RoleEnum.USER,
        },
        isVerified: { type: Boolean, required: true, default: false },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const User = mongoose.model("users", userSchema);