import { z } from 'zod';
import { CreateUserSchema } from "./user.type";

export const SignupFormSchema = CreateUserSchema.body.extend({
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
});

export const LoginFormSchema = CreateUserSchema.body.pick({
    email: true,
    password: true
});

export type SignupForm = z.infer<typeof SignupFormSchema>;
export type LoginForm = z.infer<typeof LoginFormSchema>;