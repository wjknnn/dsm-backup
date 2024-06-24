'use client';

import { getTopicList } from '@/apis';
import { Vote } from '@/assets';
import { TopicListSkeleton } from '@/components';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';

export const NextTopic = ({ id }: { id: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['topic recommend', id],
    queryFn: () => getTopicList(1, 4),
  });
  return (
    <>
      {isLoading
        ? [...new Array(5)].map((_, index) => <TopicListSkeleton key={index} />)
        : data &&
          data
            .filter((value) => value.id !== +id)
            .map((topic) => (
              <Link
                key={topic.id}
                href={`/topic/${topic.id}`}
                className="flex group"
              >
                <article className="flex flex-col gap-3">
                  <div className="flex justify-center w-full p-5 transition-transform border bg-gradient-to-t from-grayLight2 to-grayLight1 dark:from-grayDark3 dark:to-grayDark2 rounded-2xl border-grayLight2 dark:border-grayDark2 group-hover:-translate-y-1">
                    <Image
                      src={topic.image}
                      alt={`${topic.title} thumbnail`}
                      width={800}
                      height={600}
                      className="w-full"
                    />
                  </div>
                  <div className="flex flex-col flex-1 gap-2 px-1">
                    <p className="flex-1 text-bodyLarge2">{topic.title}</p>
                    <div className="flex items-center gap-1 text-grayDark15 dark:text-grayBase">
                      <Vote size={16} />
                      <p className="text-body2">
                        투표수 {topic.num_a + topic.num_b}회
                      </p>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
    </>
  );
};
