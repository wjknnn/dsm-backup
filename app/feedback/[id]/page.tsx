import { Q } from '@/assets';
import Link from 'next/link';
import { FeedbackDetail } from './FeedbackDetail';
import { AdBanner } from '@/components/ad/AdBanner';

export default function FeedbackDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = decodeURI(params.id);

  return (
    <>
      <main className="flex max-w-[1280px] w-full px-10 sm:px-6 py-20 sm:pt-10 gap-20">
        <FeedbackDetail id={id} />
        <div className="min-w-[251px] bg-blue-500">
          <AdBanner
            dataAdFormat="fluid"
            dataAdLayoutKey="-75+eu-h-24+5o"
            dataAdSlot="8058470646"
          />
        </div>
      </main>
      <Link
        href="/feedback/write"
        className="z-[100001] size-16 fixed bottom-9 right-9"
      >
        <div className="flex justify-center items-center tooltip size-16 rounded-[28px] bg-black dark:bg-white text-white dark:text-black drop-shadow-[0_2px_24px_rgba(0,0,0,0.24)] active:scale-95 transition">
          <Q size={30} />
          <span className="tooltiptext tooltip-left text-bodyLarge2">
            피드백 요청글 작성하기
          </span>
        </div>
      </Link>
    </>
  );
}
