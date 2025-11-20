import { LoginSchema } from '@/types/user.type';
import { asyncHandler } from '@/lib/api/response';
import { AuthService } from '@/services/auth.service';

// POST /api/auth/login - Login user
export const POST = asyncHandler(
    async (_, __, data) => {
        const { user, token } = await AuthService.login(data.body);
        return {
            data: user,
            cookies: [AuthService.generateAuthCookie(token)],
            message: 'Login successful'
        };
    },
    LoginSchema
);