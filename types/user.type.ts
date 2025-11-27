import { z } from 'zod';

export const UserSchema = z.object({
    id: z.string(),
    name: z.string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name too long")
        .regex(/^[a-zA-Z0-9\s]+$/, "Name can only contain letters, numbers, and spaces"),
    email: z.email("Invalid email format").nonempty("Email is required").toLowerCase().trim(),
    password: z.string().min(6, "Password must be at least 6 characters").optional(),
});

export const CreateUserSchema = {
    body: z.object({
        name: UserSchema.shape.name,
        email: UserSchema.shape.email,
        password: UserSchema.shape.password.unwrap(),
    }),
} as const;

export const GetUserSchema = {
    query: z.union([
        z.object({
            id: z.string().min(1, "ID is required"),
        }),
        z.object({
            email: z.email("Valid email is required"),
        })
    ]),
} as const;

export const UpdateUserSchema = {
    body: UserSchema.omit({ password: true }).partial().extend({
        id: z.string().min(1, "ID is required"),
    }),
} as const;

export const DeleteUserSchema = {
    query: z.object({
        id: z.string().min(1, "ID is required"),
    }),
} as const;

export type CreateUserInput = z.infer<typeof CreateUserSchema.body>;
export type GetUserInput = z.infer<typeof GetUserSchema.query>;
export type UpdateUserInput = z.infer<typeof UpdateUserSchema.body>;
export type DeleteUserInput = z.infer<typeof DeleteUserSchema.query>;

export type IUser = z.infer<typeof UserSchema>;
export type User = Omit<IUser, 'password'>;