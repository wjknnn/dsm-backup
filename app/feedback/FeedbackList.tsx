'use client';

import { getFeedbackList } from '@/apis';
import { ImageIcon, List, Post } from '@/assets';
import { FeedbackChip, FeedbackSkeleton } from '@/components';
import { feedbackPageStore } from '@/store';
import { FeedbackOrderType } from '@/types';
import { relativeTime } from '@/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const FeedbackList = ({ max }: { max: number }) => {
  const [order, setOrder] = useState<FeedbackOrderType>('latest');
  const [isList, setIsList] = useState<boolean>(false);
  const { page, updatePage } = feedbackPageStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['Feedback List', page, order, isList],
    queryFn: () => getFeedbackList(page, order, isList ? 20 : 10),
    staleTime: 10 * 1000,
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    if (page <= max - 1) {
      const nextPage = page + 1;
      queryClient.prefetchQuery({
        queryKey: ['Feedback List', nextPage],
        queryFn: () => getFeedbackList(nextPage, order, isList ? 20 : 10),
      });
    }
  }, [page]);

  useEffect(() => {
    const initIsList = localStorage.getItem('isList');
    setIsList(JSON.parse(initIsList!!));
  }, []);

  const handleIsList = (value: boolean) => {
    if (isList !== value) {
      setIsList(value);
      updatePage(value ? Math.ceil(page / 2) : page * 2 - 1);
      if (typeof window !== 'object') return;
      localStorage.setItem('isList', `${value}`);
    }
  };

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
            onClick={() => handleIsList(true)}
            className={isList ? 'text-black dark:text-white' : ''}
            aria-label="read to small list"
          >
            <List size={20} />
          </button>
          <button
            onClick={() => handleIsList(false)}
            className={!isList ? 'text-black dark:text-white' : ''}
            aria-label="read to large list"
          >
            <Post size={20} />
          </button>
        </div>
      </div>
      <section>
        {data ? (
          data.map((value, index) => (
            <Link key={index} href={`/feedback/${value.id}`} className="group">
              {isList ? (
                <article className="flex items-center gap-4 py-3 border-b border-grayLight2 dark:border-grayDark2 text-body2 sm:flex-col sm:items-start sm:gap-2">
                  <div className="flex items-center flex-1 gap-3">
                    <div
                      className={`rounded-full size-2 border dark:bg-opacity-20 ${
                        value.status === '피드백 요청'
                          ? 'bg-successBackground border-success'
                          : value.status === '논의중'
                          ? 'bg-attentionBackground border-attention'
                          : value.status === '해결됨'
                          ? 'bg-grayLight2 border-grayDark1'
                          : ''
                      }`}
                    ></div>
                    <p className="text-bodyLarge">{value.title}</p>
                    {value.image && (
                      <ImageIcon
                        size={20}
                        className="text-grayBase dark:text-grayDark1"
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-4 sm:gap-3">
                    <p className="w-20 sm:w-fit sm:text-body text-grayDark15 dark:text-grayBase">
                      피드백 {value.feedback}
                    </p>
                    <p className="text-grayDark1 sm:text-body w-[160px] md:w-20 sm:w-fit">
                      {value.users.name}
                    </p>
                    <p className="w-20 sm:w-fit text-grayDark1 sm:text-body text-end">
                      {value.created_at && relativeTime(value.created_at)}
                    </p>
                  </div>
                </article>
              ) : (
                <article className="min-h-[200px] w-full flex sm:flex-col-reverse gap-16 sm:gap-4 p-[24px_0_32px] border-b border-grayLight2 dark:border-grayDark2">
                  <div className="flex flex-col w-full gap-3 py-1">
                    <div className="flex items-center gap-2">
                      <h4 className="transition-all text-subtitle text-pretty group-hover:font-bold">
                        {value.title}
                      </h4>
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
                      src={value.image}
                      alt={`${value.title} thumbnail`}
                      width={480}
                      height={270}
                      className="w-[256px] sm:w-full h-fit rounded-xl border-[1.6px] border-grayLight2 dark:border-grayDark15 aspect-video object-cover"
                    />
                  )}
                </article>
              )}
            </Link>
          ))
        ) : isLoading ? (
          <FeedbackSkeleton />
        ) : isError ? (
          <p>error!!</p>
        ) : null}
      </section>
      <div className="flex justify-center gap-1 py-20">
        {[...new Array(isList ? Math.ceil(max / 2) : max)].map((_, i) => (
          <button
            key={i}
            onClick={() => updatePage(i + 1)}
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
