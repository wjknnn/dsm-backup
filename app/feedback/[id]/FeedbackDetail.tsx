'use client';

import { getFeedback } from '@/apis';
import { FeedbackChip } from '@/components';
import { relativeTime } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

export const FeedbackDetail = ({ id }: { id: string }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['Feedback Detail'],
    queryFn: () => getFeedback(id),
  });

  return (
    <section className="max-w-[800px] w-full flex flex-col gap-10">
      {data && (
        <>
          <div className="flex flex-col gap-4">
            <FeedbackChip status={'피드백 요청'} large />
            <h3 className="text-titleLarge">{data.title}</h3>
            <div className="flex items-center gap-3">
              <Image
                src={data.users.profile_image || '/images/DefaultProfile.png'}
                alt="profile image"
                width={40}
                height={40}
                className="object-cover bg-white border rounded-full size-10 dark:bg-grayDark3 border-grayLight2 dark:border-grayDark2"
                priority
              />
              <p className="text-bodyLarge text-grayDark2">
                {data.users.name} ∙{' '}
                {data.created_at && relativeTime(data.created_at)}
              </p>
            </div>
          </div>
          <article>
            <p className="text-bodyLarge text-grayDark3">{data.content}</p>
          </article>
          <div className="flex gap-[6px] py-6 items-center flex-wrap">
            {data.tags.map((tagName) => (
              <div
                key={tagName}
                className="p-[8px_12px] rounded-full bg-grayLight2 text-bodyLarge text-grayDark15"
              >
                #{tagName}
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};
