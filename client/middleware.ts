import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function runs BEFORE a request reaches your page (like a guard)
export function middleware(request: NextRequest) {

  // Get the refresh token from cookies (means user is logged in)
  const token = request.cookies.get('refreshToken')

  // Get the current URL path (e.g. /admin/dashboard)
  const { pathname } = request.nextUrl

  // These are routes that should only be accessed if user is logged in
  const protectedRoutes = ['/admin', '/trainer', '/member', '/superadmin']

  // Check if the current path starts with any protected route
  // Example: /admin/settings → true
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route))

  // If user is trying to access a protected route BUT has no token
  if (isProtected && !token) {

    // Redirect user to login page
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // If everything is fine → allow request to continue
  return NextResponse.next()
}

// This tells Next.js: run this middleware ONLY on these routes
export const config = {
  matcher: ['/admin/:path*', '/trainer/:path*', '/member/:path*', '/superadmin/:path*']
}