import {IUser} from "../interface/userInterface";
import {userRepository} from "../repositories/userRepositories";
import {ApiError} from "../errors/api-errors";
import {fsService} from "../fs.service";


class UserService {
    public async getList(): Promise<IUser[]> {
        return await userRepository.getList();
    }

    public async create(dto: IUser): Promise<IUser> {
        const { name, email, password } = dto;

        if (!name || name.length < 3) {
            throw new ApiError(
                "Name is required and should be at least 3 characters",
                400,
            );
        }
        if (!email || !email.includes("@")) {
            throw new ApiError("Email is required and should be valid", 400);
        }
        if (!password || password.length < 6) {
            throw new ApiError(
                "Password is required and should be at least 6 characters",
                400,
            );
        }
        return await userRepository.create(dto);
    }

    public async get(userId: number): Promise<IUser> {

        return await userRepository.get(userId);
    }
    public async put(dto: IUser, userId:number): Promise<IUser> {

        return await userRepository.put(dto, userId);
    }
    public async delete(userId:number): Promise<void> {

        return await userRepository.delete(userId);
    }
}

export const userService = new UserService();