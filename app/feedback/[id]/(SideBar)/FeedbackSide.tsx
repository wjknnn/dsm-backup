import { AdBanner } from '@/components';
import { Pagination } from './Pagination';
import { PopularFeedback } from './PopularFeedback';

export const FeedbackSide = () => {
  return (
    <aside className="flex flex-col min-w-[320px] h-fit gap-6">
      <article className="flex flex-col gap-3 p-6 border border-grayLight1 rounded-[18px]">
        <div className="min-w-[272px] min-h-[153px] bg-grayLight1 animate-pulse border border-grayLight2 rounded-lg">
          <AdBanner
            dataAdFormat="fluid"
            dataAdLayoutKey="-75+eu-h-24+5o"
            dataAdSlot="8058470646"
          />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-body text-grayDark15">Ad • Google Ads</p>
          <p className="text-body text-grayDark15">구글 광고입니다.</p>
        </div>
      </article>
      <section className="flex flex-col justify-center py-6 gap-4 border border-grayLight1 rounded-[18px]">
        <div className="flex items-center justify-between px-6">
          <p className="text-bodyLarge2">많이 본 피드백 요청</p>
          <p className="text-body2 text-grayDark15">현재 기준</p>
        </div>
        <PopularFeedback />
        <Pagination />
      </section>
    </aside>
  );
};
