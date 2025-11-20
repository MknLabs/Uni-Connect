import APIError from "@/lib/api/error";
import UserModel, { UserDocument } from "@/models/user.model";
import { User, CreateUserInput, GetUserInput, UpdateUserInput, DeleteUserInput } from "@/types/user.type";


export class UserService {
    static async Create(data: CreateUserInput): Promise<User> {
        const user: UserDocument = await UserModel.create(data);
        return user.toJSON();
    }

    static async getUser(param: GetUserInput): Promise<User> {
        const user: UserDocument | null = "id" in param
            ? await UserModel.findById(param.id)
            : await UserModel.findOne({ email: param.email });

        if (!user) throw APIError.notFound("User not found");
        return user.toJSON();
    }

    static async updateUser(data: UpdateUserInput): Promise<User> {
        const user: UserDocument | null = await UserModel.findByIdAndUpdate({
            _id: data.id
        }, data, { new: true });

        if (!user) throw APIError.notFound("User not found");
        return user.toJSON();
    }

    static async deleteUser(data: DeleteUserInput): Promise<void> {
        const user: UserDocument | null = await UserModel.findByIdAndDelete(data.id);

        if (!user) throw APIError.notFound("User not found");
        return;
    }
}