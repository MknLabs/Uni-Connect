import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('better-auth.session_token')?.value;

    const requiresAuth = [
        '/chat',
    ].some(route => pathname.startsWith(route));

    // If route requires auth and no token, redirect to login
    if (requiresAuth && !token) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('from', pathname);
        return NextResponse.redirect(loginUrl);
    }

    if (pathname === '/login' && token) {
        return NextResponse.redirect(new URL('/chat', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/chat/:path*', '/login'],
};