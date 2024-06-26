import { AdBanner } from '@/components';
import { NextTopic } from './NextTopic';

export const TopicSide = ({ id }: { id: string }) => {
  return (
    <aside className="flex flex-col lg:max-w-[320px] w-full h-fit gap-6">
      <article className="flex flex-col gap-3 p-6 border border-grayLight1 dark:border-grayDark15 rounded-[18px]">
        <div className="min-w-[272px] min-h-[153px] bg-grayLight1 dark:bg-grayDark2 animate-pulse border border-grayLight2 dark:border-grayDark2 rounded-lg">
          <AdBanner
            dataAdFormat="fluid"
            dataAdLayoutKey="-75+eu-h-24+5o"
            dataAdSlot="8058470646"
          />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-body text-grayDark15 dark:text-grayBase">
            Ad • Google Ads
          </p>
          <p className="text-body text-grayDark15 dark:text-grayBase">
            구글 광고입니다.
          </p>
        </div>
      </article>
      <NextTopic id={id} />
    </aside>
  );
};
