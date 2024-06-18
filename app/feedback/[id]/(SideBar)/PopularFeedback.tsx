'use client';

import { getPopularFeedback } from '@/apis';
import { FeedbackChip } from '@/components';
import { popularFeedbackStore } from '@/store';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useEffect } from 'react';
import { PopularFeedbackSkeleton } from './PopularFeedbackSkeleton';

export const PopularFeedback = () => {
  const { page, updateMax } = popularFeedbackStore();

  const { data, isLoading } = useQuery({
    queryKey: ['popular feedbak', page],
    queryFn: getPopularFeedback,
    staleTime: 10_000,
  });

  useEffect(() => {
    if (data) {
      updateMax(Math.ceil(data.length / 4));
    }
  }, [data]);

  return (
    <section className="flex flex-col max-w-[320px] md:max-w-none sm:max-w-none items-center">
      {isLoading ? (
        <PopularFeedbackSkeleton />
      ) : (
        data?.slice(page * 4 - 4, page * 4).map((value) => (
          <div key={value.id} className="flex flex-col w-full">
            <Link
              href={`/feedback/${value.id}`}
              className="flex flex-col w-full gap-2 px-6 py-3 hover:bg-grayLight2 dark:hover:bg-grayDark2 hover:bg-opacity-60"
            >
              <div className="flex flex-col gap-1">
                <FeedbackChip status={value.status} />
                <p className="text-bodyLarge">{value.title}</p>
              </div>
              <p className="text-body2 text-grayDark1 dark:text-grayBase line-clamp-2">
                {value.explanation}
              </p>
              <p className="text-body2 text-grayDark15 dark:text-grayLight1">
                피드백 {value.feedback}
              </p>
            </Link>
            <div className="w-[calc(100%-48px)] bg-grayLight2 dark:bg-grayDark2 h-[1px]"></div>
          </div>
        ))
      )}
    </section>
  );
};
