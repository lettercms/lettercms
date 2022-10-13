import { NextResponse } from 'next/server';

export const config = {
  matcher: [
    "/([^/.]*)",
    "/login",
    "/signin",
    "/dashboard/:path*"
  ],
};

export default function middleware(req) {
  const url = req.nextUrl;

  const isAuth = req.cookies.get('next-auth.session-token') || req.cookies.get('__Secure-next-auth.session-token');

  if (isAuth) {
    if (url.pathname === '/login' || url.pathname === '/signin') {
      url.pathname = '/dashboard';

      return NextResponse.redirect(url);
    }
  } else {
    if (url.pathname.startsWith('/dashboard')) {
      url.pathname = '/login';

      return NextResponse.redirect(url);
    }
  }

  const lastLogin = new Date(req.cookies.get('__last-login') || Date.now());
  const limit = Date.now() - (24*60*60*1000);

  if (lastLogin > limit && url.pathname === '/dashboard') {
    url.pathname = '/dashboard/posts';

    return NextResponse.redirect(url);
  } else if (lastLogin < limit &&  /\/dashboard\/\w*$/.test(url.pathname)) {
    url.pathname = '/dashboard';

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
