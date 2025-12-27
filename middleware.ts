import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protect /admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // 1. If not logged in, redirect to login
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // 2. If logged in but email doesn't match the ADMIN_EMAIL in .env, redirect to home
    // This ensures only YOU can access the admin panel.
    if (user.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // If user is already logged in and tries to go to /login, redirect to /admin
  if (user && request.nextUrl.pathname === '/login') {
     if (user.email === process.env.ADMIN_EMAIL) {
        return NextResponse.redirect(new URL('/admin', request.url))
     }
  }

  return response
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
}
