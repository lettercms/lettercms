import { NextResponse } from 'next/server';

export const config = {
  matcher: [
    '/([^/.]*)',
    '/login',
    '/blog/:path*',
    '/_preview/:path*',
    '/signin',
    '/dashboard/:path*'
  ],
};

export default function middleware(req) {
  const url = req.nextUrl;
  console.log(url.pathname);

  if (url.pathname.startsWith('/blog/')) {
    const isPreview = req.cookies.get('__next_preview_data') || req.cookies.get('__prerender_bypass');

    if (isPreview) {
      url.pathname = url.pathname.replace('/blog/', '/_preview/');
      
      return NextResponse.rewrite(url);  
    } else {
      return NextResponse.next();
    }
  }


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

  const _lastLogin = req.cookies.get('__last-login');

  if (_lastLogin) {

    const lastLogin = new Date(_lastLogin);
    const limit = Date.now() - (24*60*60*1000);

    if (lastLogin > limit && url.pathname === '/dashboard') {
      url.pathname = '/dashboard/posts';

      return NextResponse.redirect(url);
    } else if (lastLogin < limit &&  /\/dashboard\/\w*$/.test(url.pathname)) {
      url.pathname = '/dashboard';

      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
