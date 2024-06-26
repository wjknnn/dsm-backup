import { Arrow } from '@/assets';
import { Banner, TipBox, TopicBox } from '@/components';
import Link from 'next/link';

export default function Index() {
  return (
    <main className="flex flex-col animate-in max-w-[1280px] w-full px-10 sm:px-6 pt-8 pb-20 gap-20 sm:pt-[360px]">
      <Banner />
      <section className="flex flex-col gap-6">
        <div className="flex flex-wrap items-end justify-between w-full gap-x-8 gap-y-2">
          <h3 className="text-title">
            오늘,
            <br />
            필요할지도 모를 팁
          </h3>
          <Link
            href="/tip"
            className="flex items-center gap-2 text-grayDark1 hover:text-grayDark15 dark:hover:text-grayBase [&>svg]:hover:translate-x-1"
          >
            <p className="text-bodyLarge2">모든 팁 보러가기</p>
            <Arrow size={20} className="rotate-180" />
          </Link>
        </div>
        <TipBox />
      </section>
      <section className="flex flex-col gap-6">
        <div className="flex flex-wrap items-end justify-between w-full gap-x-8 gap-y-2">
          <h3 className="text-title">요즘 인기 있는 토픽</h3>
          <Link
            href="/topic"
            className="flex items-center gap-2 text-grayDark1 hover:text-grayDark15 dark:hover:text-grayBase [&>svg]:hover:translate-x-1"
          >
            <p className="text-bodyLarge2">모든 토픽 보러가기</p>
            <Arrow size={20} className="rotate-180" />
          </Link>
        </div>
        <TopicBox />
      </section>
    </main>
  );
}
