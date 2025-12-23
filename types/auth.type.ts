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

export const SignupFormSchema = z.object({
    name: UserSchema.shape.name,
    email: UserSchema.shape.email,
    password: UserSchema.shape.password.unwrap(),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});


export const LoginFormSchema = z.object({
    email: UserSchema.shape.email,
    password: UserSchema.shape.password.unwrap(),
});

export type SignupForm = z.infer<typeof SignupFormSchema>;
export type LoginForm = z.infer<typeof LoginFormSchema>;