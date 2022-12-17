import { NextResponse } from 'next/server';

export default function middleware(req) {
  const url = req.nextUrl;

  if (url.pathname === '/feed') {
    url.pathname = '/api/feed';
    return NextResponse.rewrite(url);
  }
  if (url.pathname === '/sitemap.xml') {
    url.pathname = '/api/sitemap';
    return NextResponse.rewrite(url);
  }
  if (url.pathname === '/robots.txt') {
    url.pathname = '/api/robots';
    return NextResponse.rewrite(url);
  }
  if (url.pathname === '/manifest.json') {
    url.pathname = '/api/manifest';
    return NextResponse.rewrite(url);
  }

  if (url.pathname.startsWith('/_next') || url.pathname.startsWith('/api') || url.pathname.includes('.')) {

   return NextResponse.next();
  }

  let currentHost = null;
  const hostname = req.headers.get('host') || 'davidsdevel.lettercms.vercel.app';

  //Switch between staging and production
  if (hostname.startsWith('lettercms-client-'))
    currentHost = 'davidsdevel';
  else
    currentHost =
      process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'
        ? hostname.replace('.lettercms.vercel.app', '')
        : hostname.replace('.localhost:3002', '');

  const isPreview = req.cookies.get('__next_preview_data') || req.cookies.get('__prerender_bypass');

  if (isPreview) {
    url.pathname = `/_preview/${currentHost}${url.pathname}`;
    return NextResponse.rewrite(url);  
  }

  url.pathname = `/_blog/${currentHost}${url.pathname}`;
  return NextResponse.rewrite(url);

  /*const userID = req.cookies.get('userID');
  
  if (!userID || url.pathname === '/search') {
    url.pathname = `/_blogs/${currentHost}${url.pathname}`;
    return NextResponse.rewrite(url);
  }*/
}
