'use client';

import { getTopicList } from '@/apis';
import { Arrow, Vote } from '@/assets';
import { useSuspenseQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';

export const TopicBox = () => {
  const { data } = useSuspenseQuery({
    queryKey: ['main topic'],
    queryFn: () => getTopicList(),
  });

  return (
    <section className="grid grid-cols-4 gap-6 lg:gap-2 md:grid-cols-2 sm:grid-cols-1">
      {data?.data.map((value) => (
        <Link
          key={value.id}
          href={`/topic/${value.id}`}
          className="flex flex-col w-full bg-grayLight2 dark:bg-grayDark2 rounded-2xl group"
        >
          <div className="flex justify-center w-full border bg-gradient-to-t from-white dark:from-grayDark3 dark:to-grayDark2 rounded-2xl border-grayLight2 dark:border-grayDark2">
            <Image
              src={process.env.NEXT_PUBLIC_IMAGE_URL + value.image}
              alt={`${value.title} thumbnail`}
              width={400}
              height={300}
            />
          </div>
          <div className="flex flex-col gap-3 p-[24px_16px_32px] h-full">
            <div className="flex justify-between h-full gap-3" id="arrow">
              <p className="flex-1 text-subtitle line-clamp-2">{value.title}</p>
              <Arrow className="transition-transform rotate-180 group-hover:translate-x-1" />
            </div>
            <div className="flex gap-1">
              <Vote size={20} className="text-grayDark1" />
              <p className="text-bodyStrong text-grayDark1">
                투표수 {value.numA + value.numB}회
              </p>
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
};
