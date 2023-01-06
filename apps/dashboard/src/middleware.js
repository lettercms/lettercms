import { NextResponse } from 'next/server';

const supportedLanguages = [
  'es',
  'en'
];

function parseQuery(search) {
  if (!search)
    return null;

  const query = {};

  const q = search.slice(1);
  q.split('&').forEach(e => {
    const [key, value] = e.split('=');

    query[key] = value;
  });

  return query;
}

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
  let query = parseQuery(url.search);

  let language;

  //Check if has hl query on searchParams
  if (query?.hl)
    language = query.hl;
  else
    language = req.headers.get('accept-language')?.split(',')?.[0].split('-')?.[0].toLowerCase() || 'en';
    
  //If language is not supported, set to english
  if (!supportedLanguages.includes(language))
    language = 'en';

  if (url.pathname.startsWith('/blog/')) {
    const isPreview = req.cookies.get('__next_preview_data') || req.cookies.get('__prerender_bypass');

    if (isPreview) {
      url.searchParams.set('hl', language);
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
    const limit = Date.now() - (24*60*60*1000); //Get time less 24 hours

    //If less than 24h, path /dashboard redirects to /dashboard/post
    if (lastLogin > limit && url.pathname === '/dashboard') {
      url.pathname = '/dashboard/posts';

      return NextResponse.redirect(url);
    } else if (lastLogin < limit &&  /\/dashboard\/\w*$/.test(url.pathname)) {
      url.pathname = '/dashboard';

      return NextResponse.redirect(url);
    }
  }

  url.searchParams.set('hl', language);
  return NextResponse.rewrite(url);
}
