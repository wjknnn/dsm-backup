'use client';

import { getFeedbackList } from '@/apis/feedback/getFeedbackList';
import { List, Post } from '@/assets';
import { FeedbackChip, FeedbackSkeleton } from '@/components';
import { FeedbackOrderType } from '@/types';
import { relativeTime } from '@/utils/timeUtils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const FeedbackList = ({ max }: { max: number }) => {
  const [order, setOrder] = useState<FeedbackOrderType>('latest');
  const [isList, setIsList] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['Feedback List', page, order],
    queryFn: () => getFeedbackList(page, order),
    staleTime: 10 * 1000,
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    if (page <= max - 1) {
      const nextPage = page + 1;
      queryClient.prefetchQuery({
        queryKey: ['Feedback List', nextPage],
        queryFn: () => getFeedbackList(nextPage, order),
      });
    }
  }, [page]);

  const isOrder = (orderType: FeedbackOrderType) =>
    order === orderType ? 'text-black text-bodyStrong dark:text-white' : '';

  return (
    <>
      <div className="flex items-center justify-end gap-4 py-6 border-b border-grayLight1 dark:border-grayDark2">
        <div className="flex gap-2 text-body2 text-grayDark1">
          <button
            onClick={() => setOrder('popular')}
            className={isOrder('popular')}
          >
            • 인기순
          </button>
          <button onClick={() => setOrder('less')} className={isOrder('less')}>
            • 피드백적은순
          </button>
          <button
            onClick={() => setOrder('latest')}
            className={isOrder('latest')}
          >
            • 최신순
          </button>
        </div>
        <div className="h-4 w-[1px] bg-grayBase dark:bg-grayDark15" />
        <div className="flex gap-2 text-grayDark1">
          <button
            onClick={() => setIsList(true)}
            className={isList ? 'text-black dark:text-white' : ''}
            aria-label="read to small list"
          >
            <List size={20} />
          </button>
          <button
            onClick={() => setIsList(false)}
            className={!isList ? 'text-black dark:text-white' : ''}
            aria-label="read to large list"
          >
            <Post size={20} />
          </button>
        </div>
      </div>
      <section>
        {data ? (
          data.data.map((value, index) => (
            <Link key={index} href={`/feedback/${value.id}`}>
              <article className="min-h-[200px] w-full flex sm:flex-col-reverse gap-16 sm:gap-4 p-[24px_0_32px] border-b border-grayLight2 dark:border-grayDark2">
                <div className="flex flex-col w-full gap-3 py-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-subtitle text-pretty">{value.title}</h4>
                    <FeedbackChip status={value.status} />
                  </div>
                  <p
                    className={`text-bodyLarge text-grayDark1 line-clamp-2 ${
                      value.image ? '' : 'lg:w-[90%]'
                    }`}
                  >
                    {value.explanation}
                  </p>
                  <div className="flex gap-[6px]">
                    {value.tags?.map((value, index) => (
                      <div
                        key={`tag-${index}`}
                        className="p-[4px_8px] text-body2 rounded-full bg-grayLight2 text-grayDark15 dark:bg-grayDark2 dark:text-grayBase"
                      >
                        #{value}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3 text-body2">
                    <p className="text-grayDark15 dark:text-grayBase">
                      피드백 {value.feedback}
                    </p>
                    <p className="text-grayDark1">
                      {value.users.name} ∙{' '}
                      {value.created_at && relativeTime(value.created_at)}
                    </p>
                  </div>
                </div>
                {value.image && (
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_IMAGE_URL + value.image + '.webp'
                    }
                    alt={`${value.title} thumbnail`}
                    width={480}
                    height={270}
                    className="w-[256px] sm:w-full h-fit rounded-xl border-[1.6px] border-grayLight2 dark:border-grayDark15 aspect-video object-cover"
                  />
                )}
              </article>
            </Link>
          ))
        ) : isLoading ? (
          <FeedbackSkeleton />
        ) : isError ? (
          <p>error!!</p>
        ) : null}
      </section>
      <div className="flex justify-center gap-1 py-20">
        {[...new Array(2)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`flex items-center justify-center size-10 rounded-xl ${
              page === i + 1 ? 'bg-grayDark3 dark:bg-grayLight2' : ''
            }`}
          >
            <p
              className={
                page === i + 1
                  ? 'text-bodyLarge2 text-white dark:text-black'
                  : 'text-bodyLarge'
              }
            >
              {i + 1}
            </p>
          </button>
        ))}
      </div>
    </>
  );
};
