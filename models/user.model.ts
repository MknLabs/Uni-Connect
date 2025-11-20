import bcrypt from "bcrypt";
import { IUser, User } from "@/types/user.type";
import mongoose from "mongoose";

export interface UserDocument extends mongoose.Document, Omit<IUser, 'id'> {
    _id: mongoose.Types.ObjectId;
    isPasswordCorrect(providedPassword: string): Promise<boolean>;
    toJSON(): User;
}

const UserSchema = new mongoose.Schema<UserDocument>({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: false },
}, {
    timestamps: true,
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password') || !this.password) {
        return next();
    }

    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.isPasswordCorrect = async function (providedPassword: string): Promise<boolean> {
    if (!this.password) {
        return false;
    }
    return await bcrypt.compare(providedPassword, this.password);
};

UserSchema.methods.toJSON = function (): User {
    const userObject = this.toObject();

    const { _id, password, __v, ...rest } = userObject;

    return {
        ...rest,
        id: _id.toString(),
    };
};

const UserModel = mongoose.model<UserDocument, mongoose.Model<UserDocument>>("User", UserSchema);

export default UserModel;