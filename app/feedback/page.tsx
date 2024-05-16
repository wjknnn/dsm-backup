import { createClient } from '@/utils/supabase/server';
import { FeedbackList } from './FeedbackList';
import Link from 'next/link';
import { Q } from '@/assets';

export default async function FeedbackPage() {
  const supabase = createClient();
  const { count } = await supabase
    .from('feedback')
    .select('*', { count: 'exact' });

  return (
    <>
      <main className="flex flex-col animate-in max-w-[1280px] w-full px-10 sm:px-6 pt-16 pb-20 sm:pt-10">
        <div className="flex flex-col gap-4">
          <h1 className="text-titleLarge">피드백</h1>
          <p className="text-bodyLarge">
            피드백을 받고 싶은 디자인을 올려 유저들의 피드백을 받아보세요.
          </p>
        </div>
        <FeedbackList max={Math.ceil((count || 50) / 10)} />
      </main>
      <Link
        href="/feedback/write"
        className="z-[100001] size-16 fixed bottom-9 right-9"
      >
        <div className="flex justify-center items-center tooltip size-16 rounded-[28px] bg-black dark:bg-white text-white dark:text-black drop-shadow-[0_2px_24px_rgba(0,0,0,0.24)] dark:drop-shadow-[0_2px_24px_rgba(255,255,255,0.24)]">
          <Q size={30} />
          <span className="tooltiptext tooltip-left text-bodyLarge2">
            피드백 요청글 작성하기
          </span>
        </div>
      </Link>
    </>
  );
}
