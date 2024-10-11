import { NextResponse } from 'next/server';
import { supabase } from "@/lib/supabase";

export async function middleware(req) {
  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
    && !req.nextUrl.pathname.includes("/login");
  const token = req.cookies.get('token');

  if (isAdminRoute) {
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }

    const { data: { user } } = await supabase.auth.getUser(token.value)

    if (!user) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
