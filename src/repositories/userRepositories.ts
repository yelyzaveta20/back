import {IUser} from "../interface/userInterface";
import {User} from "../models/user.module";


class UserRepository {
    public async getList(): Promise<IUser[]> {
        return await User.find();
    }

    public async create(dto: IUser): Promise<IUser> {
        return await User.create(dto);
    }

    public async getById(userId: string): Promise<IUser> {
        return await User.findById(userId);
    }


    public async updateById(userId: string, dto: IUser): Promise<IUser> {
        return await User.updateOne(userId, dto);
        // const users = await fsService.read();
        // const user = users.find((user) => user.id === userId);
        // if (!user) {
        //   throw new ApiError("User not found", 422);
        // }
        //
        // if (dto.name) user.name = dto.name;
        // if (dto.email) user.email = dto.email;
        // if (dto.password) user.password = dto.password;
        //
        // await fsService.write(users);
        // return user;
    }

    //TODO
    public async deleteById(userId: string): Promise<void> {
        return await User.deleteOne(userId);
        // const users = await fsService.read();
        // const index = users.findIndex((user) => user.id === userId);
        // if (index === -1) {
        //   throw new ApiError("User not found", 422);
        // }
        // users.splice(index, 1);
        // await fsService.write(users);
    }
}

export const userRepository = new UserRepository();