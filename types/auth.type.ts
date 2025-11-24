import { z } from 'zod';
import { CreateUserSchema } from "./user.type";

export const CreateUserFormSchema = CreateUserSchema.body.extend({
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
});

export type CreateUserForm = z.infer<typeof CreateUserFormSchema>