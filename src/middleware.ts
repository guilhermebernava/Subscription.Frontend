import { NextRequest, NextResponse } from 'next/server';

const supportedLocales = ['us', 'br'];
const defaultLocale = '/us';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const url = pathname.split('/')[1];
  const token = req.cookies.get('token')?.value;
  const isLoginPath = pathname.endsWith('/login');

  if (!token && !isLoginPath) {
    return NextResponse.redirect(new URL(`/${url}/login`, req.url));
  }

  if (pathname === '/') {
    return NextResponse.next();
  }

  if (!supportedLocales.includes(url)) {
    return NextResponse.redirect(new URL(`${defaultLocale}`, req.url));
  }


  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
