'use server';

import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { ProfileModal } from './ProfileModal';
import { redirect } from 'next/navigation';

export async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    'use server';

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect('/login');
  };

  return user ? (
    <div className="flex items-center gap-4 text-black dark:text-white">
      <ProfileModal
        logOut={signOut}
        email={user.email}
        name={user.user_metadata.name}
      />
    </div>
  ) : (
    <Link
      href="/login"
      aria-label="Go to login page"
      className="rounded-full flex p-[8px_24px] bg-black dark:bg-white text-white dark:text-black"
    >
      로그인
    </Link>
  );
}
