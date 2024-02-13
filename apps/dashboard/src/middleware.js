import { NextResponse } from 'next/server';

const supportedLanguages = [
  'es',
  'en'
];

export const config = {
  matcher: [
    '/([^/.]*)',
    '/:path*'
  ]
};

export default function middleware(req) {
  const url = req.nextUrl;

  if (url.pathname.includes('/_next/') || url.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  let language;

  const hostname = req.headers.get('host') || 'davidsdevel.lettercms.vercel.app';
  const isLogged = req.cookies.get('next-auth.session-token') || req.cookies.get('__Secure-next-auth.session-token');
  const languageCookie = req.cookies.get('__lcms-hl');

  if (languageCookie)
    language = languageCookie;
  else
    language = req.headers.get('accept-language')?.split(',')?.[0].split('-')?.[0].toLowerCase() || 'en';

  if (!supportedLanguages.includes(language))
    language = 'en';

  url.searchParams.set('hl', language);

  if (process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production')
    return NextResponse.rewrite(url);

  const currentHost =
    process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'
      ? hostname.replace('.lettercms.vercel.app', '')
      : hostname.replace('.localhost:3000', '');

  if (currentHost == 'dashboard') {
    if (isLogged && (url.pathname === '/login' || url.pathname === '/signup')) {
      url.pathname = '/';
      return NextResponse.redirect(url);
    } else if (!isLogged && (url.pathname !== '/login' || url.pathname !== '/signup')) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }

    url.pathname = `/_dashboard${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  //Assign subdomain to public API
  if (currentHost === 'api') {
    url.pathname = `/api/_public${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  if (currentHost === 'usercontent') {
    url.pathname = `/api/_usercontent${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  if (hostname === 'localhost:3000' || hostname === 'lettercms.vercel.app') {
    if (url.pathname === '/login') {
      url.host = hostname;
      return NextResponse.redirect(url);
    }
    url.pathname = `/_landing${url.pathname}`;

    return NextResponse.rewrite(url);
  }

  // rewrite everything else to `/_blogs/[site] dynamic route
  /*url.pathname = `/_blogs/${currentHost}${url.pathname}`;
  return NextResponse.rewrite(url);*/

  return NextResponse.next();
}
