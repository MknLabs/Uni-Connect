import jwt from 'jsonwebtoken';
import env from "@/config/env";
import APIError from "@/lib/api/error";
import { User, LoginInput } from "@/types/user.type";
import UserModel, { UserDocument } from "@/models/user.model";

export class AuthService {
    static async login(data: LoginInput): Promise<{ user: User; token: string }> {
        const user: UserDocument | null = await UserModel.findOne({ email: data.email });
        if (!user) throw APIError.notFound("User not found");

        const isPasswordValid = await user.isPasswordCorrect(data.password);
        if (!isPasswordValid) throw APIError.unauthorized("Invalid credentials");

        const token = jwt.sign(
            { userId: user._id },
            env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        return {
            user: user.toJSON(),
            token
        };
    }

    static async getCurrentUser(token: string): Promise<User> {
        const decoded = jwt.verify(token, env.JWT_SECRET || 'secret') as { userId: string };
        const user: UserDocument | null = await UserModel.findById(decoded.userId);

        if (!user) {
            throw APIError.notFound("User not found");
        }

        return user.toJSON();
    }

    static generateAuthCookie(token: string) {
        return {
            name: 'token',
            value: token,
            maxAge: 7 * 24 * 60 * 60 // 7 days
        };
    }

    static generateLogoutCookie() {
        return {
            name: 'token',
            value: '',
            maxAge: 0 // Expire now
        };
    }
}