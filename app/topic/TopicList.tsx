'use client';

import { getTopicList } from '@/apis';
import { Vote } from '@/assets';
import { topicPageStore } from '@/store';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

export const TopicList = ({ max }: { max: number }) => {
  const { page, updatePage } = topicPageStore();
  const { data, isLoading } = useQuery({
    queryKey: ['topic list', page],
    queryFn: () => getTopicList(page),
    staleTime: 30 * 1000,
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    if (page <= max - 1) {
      const nextPage = page + 1;
      queryClient.prefetchQuery({
        queryKey: ['Feedback List', nextPage],
        queryFn: () => getTopicList(nextPage),
      });
    }
  }, [page]);

  return (
    <div className="flex flex-col">
      {isLoading ? (
        <>loading...</>
      ) : (
        data && (
          <section className="grid grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-x-4 gap-y-8">
            {data.map((topic) => (
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
          </section>
        )
      )}
      <div className="flex justify-center gap-1 py-20">
        {[...new Array(max)].map((_, i) => (
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
    </div>
  );
};
