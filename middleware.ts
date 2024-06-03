import { type NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  if (
    !request.cookies.has('sb-lxpaoyxnoburzcujblhu-auth-token.0') &&
    request.cookies.has('token')
  ) {
    request.cookies.delete('token');
    request.cookies.delete('userId');
  }
  return await updateSession(request);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
