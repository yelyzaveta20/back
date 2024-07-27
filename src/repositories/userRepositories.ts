
import { fsService } from "../fs.service";
import {IUser} from "../interface/userInterface";
import {ApiError} from "../errors/api-errors";


class UserRepository {
    public async getList(): Promise<IUser[]> {
        return await fsService.read();
    }

    public async create(dto: IUser): Promise<IUser> {
        const users = await fsService.read();
        const index = users.findIndex((user) => user.email === dto.email);
        if (index !== -1) {
            throw new ApiError("User with this email already exists", 409);
        }
        const newUser = {
            id: users[users.length - 1].id + 1,
            name: dto.name,
            email: dto.email,
            password: dto.password,
        };
        users.push(newUser);
        await fsService.write(users);
        return newUser;
    }
    public async get(userId: number): Promise<IUser> {
        const users = await fsService.read();
        const user = users.find((user) => user.id === userId);
        if (!user) {
            throw new ApiError("User not found", 404);
        }
        return user;
    }
    public async put(userId: number, dto: IUser ): Promise<IUser> {
        const users = await fsService.read();
        const user = users.find((user) => user.id === userId);
        if (!user) {
            throw new ApiError("User not found", 404);
        }

        if (dto.name) user.name = dto.name;
        if (dto.email) user.email = dto.email;
        if (dto.password) user.password = dto.password;

        await fsService.write(users);
    }
    public async delete(userId: number): Promise<void> {
        const users = await fsService.read();
        const index = users.findIndex((user) => user.id === userId);
        if (index === -1) {
            throw new ApiError("User not found", 404);
        }
        users.splice(index, 1);
        await fsService.write(users);
    }
}

export const userRepository = new UserRepository();