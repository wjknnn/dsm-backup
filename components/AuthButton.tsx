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
      <Link href="?show=true" aria-label="Open user modal">
        <div className="w-[40px] h-[40px] rounded-full bg-grayLight1 border border-grayBase dark:bg-grayDark2 dark:border-grayDark15 overflow-hidden"></div>
      </Link>
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
