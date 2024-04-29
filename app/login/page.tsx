import Link from 'next/link';
import { headers } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { SubmitButton } from './submit-button';
import { Arrow, Facebook, Github, Google } from '@/assets';

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const loginWithGithub = async () => {
    'use server';

    console.log("i'm login with github");

    const origin = headers().get('origin');
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      console.error('GitHub OAuth login error:', error.message);
      return redirect('/login?message=Could not authenticate with GitHub');
    }

    if (data) {
      return redirect(data.url);
    }
  };

  const loginWithGoogle = async () => {
    'use server';

    const origin = headers().get('origin');
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      console.error('Google OAuth login error:', error.message);
      return redirect('/login?message=Could not authenticate with Google');
    }

    if (data) {
      return redirect(data.url);
    }
  };

  const loginWithFacebook = async () => {
    'use server';

    const origin = headers().get('origin');
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      console.error('Facebook OAuth login error:', error.message);
      return redirect('/login?message=Could not authenticate with Facebook');
    }

    if (data) {
      return redirect(data.url);
    }
  };

  return (
    <section className="flex flex-col gap-[64px] sm:gap-[40px] max-w-[480px] w-full p-[80px_40px_0] sm:p-[40px_24px_64px]">
      <div className="flex flex-col">
        <Link
          href="/"
          aria-label="Go back"
          className="flex items-center justify-center w-[40px] h-[40px] border border-grayLight1 rounded-[8px] [&>svg]:hover:translate-x-[-4px] hover:bg-grayLight2 dark:border-grayDark2 hover:dark:bg-grayDark2"
        >
          <Arrow />
        </Link>
        <h3 className="text-titleLarge2 sm:text-titleLarge mt-[12px] sm:mb-[8px]">
          로그인
        </h3>
        <p className="text-bodyLarge">
          소셜 로그인으로 빠르게 서비스를 이용해보세요.
        </p>
      </div>
      <form className="flex flex-col gap-[12px]">
        <SubmitButton
          formAction={loginWithFacebook}
          className="flex items-center justify-between rounded-[16px] p-[16px_24px] border text-white border-grayLight1 dark:border-grayDark2 bg-[rgb(24,119,242)] hover:bg-[rgb(20,100,204)]"
          pendingText="Facebook 로그인 중..."
        >
          <Facebook />
          <p className="text-bodyLarge1">Facebook 로그인</p>
          <div className="w-[28px]"></div>
        </SubmitButton>
        <SubmitButton
          formAction={loginWithGoogle}
          className="flex items-center justify-between rounded-[16px] p-[16px_24px] border border-grayLight1 dark:border-grayDark2 hover:bg-grayLight2 dark:hover:bg-black"
          pendingText="Google 로그인 중..."
        >
          <Google />
          <p className="text-bodyLarge1">Google 로그인</p>
          <div className="w-[28px]"></div>
        </SubmitButton>
        <SubmitButton
          formAction={loginWithGithub}
          className="flex items-center justify-between rounded-[16px] p-[16px_24px] border text-white border-grayLight1 dark:border-grayDark2 bg-[rgb(36,41,45)] hover:bg-black"
          pendingText="Github 로그인 중..."
        >
          <Github />
          <p className="text-bodyLarge1">Github 로그인</p>
          <div className="w-[28px]"></div>
        </SubmitButton>
      </form>
    </section>
  );
}
