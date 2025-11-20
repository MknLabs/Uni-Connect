import { asyncHandler } from '@/lib/api/response';
import { AuthService } from '@/services/auth.service';

// GET /api/auth/me - Get current authenticated user
export const GET = asyncHandler(
    async (req) => {
        const token = req.cookies.get('token')?.value;
        if (!token) throw new Error('Not logged in');

        const user = await AuthService.getCurrentUser(token);

        return {
            data: user,
            message: 'Authenticated'
        };
    }
);