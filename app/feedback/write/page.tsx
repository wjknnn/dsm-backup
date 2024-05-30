import { isSignedUser } from '@/utils/serverIndex';
import { redirect } from 'next/navigation';
import { WriteSection } from './WriteSection';

export default async function FeedbackWritePage() {
  if (!(await isSignedUser())) {
    return redirect('/login');
  }

  return (
    <main className="flex flex-col max-w-[1280px] w-full px-10 sm:px-6 pt-16 pb-20 sm:pt-10 gap-10">
      <div className="flex flex-col gap-4">
        <h1 className="text-titleLarge">피드백 요청</h1>
        <p className="text-bodyLarge">
          디자인 피드백 요청을 올려 유저들의 피드백을 받아보세요.
        </p>
      </div>
      <WriteSection />
    </main>
  );
}
