import { asyncHandler } from '@/lib/api/response';
import { AuthService } from '@/services/auth.service';

// POST /api/auth/logout - Logout user
export const POST = asyncHandler(
    async () => {
        return {
            data: null,
            message: 'Logged out',
            cookies: [AuthService.generateLogoutCookie()]
        };
    }
);