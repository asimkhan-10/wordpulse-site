import { NextResponse } from 'next/server';

export function middleware(request) {
  const host = request.headers.get('host') || '';
  const url = request.nextUrl.clone();

  // 1. Redirect non-www host (5letterwords.me) to www.5letterwords.me (301 permanent redirect)
  if (host === '5letterwords.me') {
    url.host = 'www.5letterwords.me';
    url.protocol = 'https:';
    return NextResponse.redirect(url, 301);
  }

  // 2. Redirect uppercase or mixed-case /starting-with/[letter] routes to lowercase
  const pathname = url.pathname;
  if (pathname.startsWith('/starting-with/')) {
    const letterPart = pathname.slice('/starting-with/'.length);
    if (letterPart && letterPart !== letterPart.toLowerCase()) {
      url.pathname = `/starting-with/${letterPart.toLowerCase()}`;
      return NextResponse.redirect(url, 301);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
