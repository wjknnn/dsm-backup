import { redirect } from 'next/navigation';
import { SignupInput } from './signupInput';
import { isSignedUser } from '@/utils/serverIndex';

export default async function Signup() {
  if (await isSignedUser()) return redirect('/protected');

  return (
    <section className="flex flex-col max-w-[448px] w-full p-[64px_24px] sm:p-[40px_24px_64px] gap-[64px] sm:gap-[40px]">
      <div className="flex flex-col">
        <h2 className="text-titleLarge2 sm:text-titleLarge sm:mb-[8px]">
          회원가입
        </h2>
        <p className="text-bodyLarge">서비스 이용에 필요한 정보들이에요.</p>
      </div>
      <SignupInput />
    </section>
  );
}
