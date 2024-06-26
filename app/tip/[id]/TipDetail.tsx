'use client';

import { getTip } from '@/apis';
import { Share } from '@/assets';
import { relativeTime } from '@/utils';
import useMoonerDown from '@/utils/editor/hook/useMoonerDown';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

export const TipDetail = ({ id }: { id: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['tip detail', id],
    queryFn: () => getTip(+id),
    staleTime: 1000 * 30,
  });

  const { Result } = useMoonerDown(data?.content);

  return isLoading ? (
    <></>
  ) : (
    data && (
      <>
        <Image
          src={data.thumbnail || ''}
          alt={data.title}
          width={1000}
          height={500}
          className="w-full h-auto border aspect-[2/1] object-cover rounded-3xl border-grayLight1"
        />
        <div className="flex flex-col items-center gap-3">
          <p className="text-center text-body2 text-grayDark1 dark:text-grayBase">
            {data.explanation}
          </p>
          <p className="text-center text-titleLarge">{data.title}</p>
          <div className="flex items-center gap-2 text-bodyLarge text-grayDark1 dark:text-grayBase">
            <p>읽는 시간 {3}분</p>
            <p>|</p>
            <p>{relativeTime(data.created_at)}</p>
          </div>
        </div>
        <div className="py-6 -m-3">{Result}</div>
        <button className="flex gap-2 items-center p-[11px_24px] h-12 rounded-full border text-bodyLarge hover:bg-grayLight2 dark:hover:bg-grayDark2 text-grayDark15 dark:text-grayLight1 border-grayLight1 dark:border-grayDark15">
          <Share size={20} />
          공유하기
        </button>
        {/* <iframe
          width="800"
          height="450"
          src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FCUp1fH4Z8oAplrWHErzWfM%2FBackup%3Fnode-id%3D1705-185%26t%3DlSv0h2j40vbAm3hs-1"
          allowFullScreen
          className="border border-black rounded-2xl border-opacity-10"
        ></iframe> */}
      </>
    )
  );
};
