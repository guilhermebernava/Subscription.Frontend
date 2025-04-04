import { NextRequest, NextResponse } from 'next/server';

const supportedLocales = ['us', 'br'];
const defaultLocale = '/us';
const publicPages = ['login', 'create-user', 'reset-password', 'confirm-user'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const url = pathname.split('/')[1];

  if (!supportedLocales.includes(url)) {
    return NextResponse.redirect(new URL(`${defaultLocale}`, req.url));
  }

  const token = req.cookies.get('token');
  const actualLanguage = pathname.split('/')[1];

  if (token) {
    return NextResponse.next();
  } else if (!token && !pathname.includes('/login')) {
    if (publicPages.some((page) => pathname.includes(page))) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL(`${actualLanguage}/login`, req.url));
  }
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
