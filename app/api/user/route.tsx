import { asyncHandler } from '@/lib/api/response';
import { UserService } from '@/services/user.service';
import { CreateUserSchema, DeleteUserSchema, GetUserSchema, UpdateUserSchema } from '@/types/user.type';

// POST /api/user - Create a new user
export const POST = asyncHandler(
    async (_, __, data) => {
        const user = await UserService.Create(data.body);
        return {
            data: user,
            message: 'Created user successfully'
        };
    },
    CreateUserSchema
);

// GET /api/user - get user
export const GET = asyncHandler(
    async (_, __, data) => {
        const user = await UserService.getUser(data.query);
        return {
            data: user,
            message: 'User retrieved successfully'
        };
    },
    GetUserSchema
);

// PUT /api/user - Update user
export const PUT = asyncHandler(
    async (_, __, data) => {
        const user = await UserService.updateUser(data.body);
        return {
            data: user,
            message: 'User updated successfully'
        };
    },
    UpdateUserSchema
);

// DELETE /api/user - Delete user
export const DELETE = asyncHandler(
    async (_, __, data) => {
        await UserService.deleteUser(data.query);
        return {
            message: 'User deleted successfully'
        };
    },
    DeleteUserSchema
);