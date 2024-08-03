import {RoleEnum} from "../enums/enums.role";


export interface IUser {
    _id?: string;
    name: string;
    age: number;
    email: string;
    password: string;
    phone?: string;
    role: RoleEnum;
    isVerified: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}