'use client';

import { getPopularFeedback } from '@/apis';
import { FeedbackChip } from '@/components';
import { popularFeedbackStore } from '@/store';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useEffect } from 'react';

export const PopularFeedback = () => {
  const { page, updateMax } = popularFeedbackStore();

  const { data } = useQuery({
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
    <section className="flex flex-col max-w-[320px] items-center">
      {data?.slice(page * 4 - 4, page * 4).map((value) => (
        <>
          <Link
            href={`/feedback/${value.id}`}
            key={value.id}
            className="flex flex-col w-full gap-2 px-6 py-3 hover:bg-grayLight2 hover:bg-opacity-60"
          >
            <div className="flex flex-col gap-1">
              <FeedbackChip status={value.status} />
              <p className="text-bodyLarge">{value.title}</p>
            </div>
            <p className="text-body2 text-grayDark1 line-clamp-2">
              {value.explanation}
            </p>
            <p className="text-body2 text-grayDark15">
              피드백 {value.feedback}
            </p>
          </Link>
          <div className="w-[calc(100%-48px)] bg-grayLight2 h-[1px]"></div>
        </>
      ))}
    </section>
  );
};
