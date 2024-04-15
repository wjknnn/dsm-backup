import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    const cookie = cookies().get('sb-lxpaoyxnoburzcujblhu-auth-token.0')?.value;
    const userId = cookie?.split(':')[7].split('"')[1];
    console.log(userId);
    const { data, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    if (error) {
      return NextResponse.redirect(`${requestUrl.origin}/login`);
    }
    if (userError) {
      return NextResponse.redirect(`${requestUrl.origin}/signup`);
    }
  }

  // URL to redirect to after sign up process completes
  return NextResponse.redirect(`${requestUrl.origin}/protected`);
}
