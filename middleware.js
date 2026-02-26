import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Proteger /cervecero y /cervecero/edit (excepto /cervecero/login)
  if (pathname.startsWith('/cervecero') && !pathname.startsWith('/cervecero/login')) {
    const token = request.cookies.get('admin_token')?.value;

    // Verificar que la cookie existe y tiene formato hex de 64 caracteres
    if (!token || !/^[a-f0-9]{64}$/.test(token)) {
      const url = new URL('/cervecero/login', request.url);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/cervecero/:path*'],
};