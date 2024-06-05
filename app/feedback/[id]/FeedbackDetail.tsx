'use client';

import { getFeedback } from '@/apis';
import { Chat, More, Pen, Share } from '@/assets';
import { FeedbackChip, MoreSelect, useSelect } from '@/components';
import { getCookie, relativeTime } from '@/utils';
import useMoonerDown from '@/utils/editor/hook/useMoonerDown';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

export const FeedbackDetail = ({ id }: { id: string }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['Feedback Detail', id],
    queryFn: () => getFeedback(id),
  });

  const { Result } = useMoonerDown(data?.content);
  const { modal, toggleModal } = useSelect<'share' | 'more'>();
  const userId = getCookie('userId');

  const deleteFeedback = () => {};

  return (
    <section className="max-w-[800px] w-full flex flex-col gap-10">
      {data && (
        <>
          <div className="flex flex-col gap-4">
            <FeedbackChip status={data.status} large />
            <h3 className="text-titleLarge">{data.title}</h3>
            <div className="flex items-center gap-3">
              <Image
                src={data.users.profile_image || '/images/DefaultProfile.png'}
                alt="profile image"
                width={80}
                height={80}
                className="object-cover bg-white border rounded-full cursor-pointer size-10 dark:bg-grayDark3 border-grayLight2 dark:border-grayDark2"
                priority
              />
              <p className="text-bodyLarge text-grayDark2 dark:text-grayLight1">
                {data.users.name} ∙{' '}
                {data.created_at && relativeTime(data.created_at)}
              </p>
            </div>
          </div>
          <article className="pb-6">
            <p className="text-bodyLarge text-grayDark3 dark:text-grayLight2 m-[-12px]">
              {Result}
            </p>
          </article>
          {data.tags && (
            <div className="flex gap-[6px] pb-6 items-center flex-wrap">
              {data.tags.map((tagName) => (
                <button
                  key={tagName}
                  className="p-[8px_12px] rounded-full bg-grayLight2 dark:bg-grayDark2 text-bodyLarge text-grayDark15 dark:text-grayLight1 hover:bg-grayLight1 dark:hover:bg-grayDark15"
                >
                  #{tagName}
                </button>
              ))}
            </div>
          )}
          <div className="flex justify-between">
            <div className="flex gap-2">
              <button className="flex gap-2 items-center p-[12px_24px] rounded-full border border-grayLight1 dark:border-grayDark15 text-bodyLarge text-grayDark15 dark:text-grayLight1 hover:bg-grayLight2 dark:hover:bg-grayDark2">
                <Chat size={20} />
                <p>댓글</p>
              </button>
              <button className="flex gap-2 items-center p-[12px_24px] rounded-full border border-grayLight1 dark:border-grayDark15 text-bodyLarge text-grayDark15 dark:text-grayLight1 hover:bg-grayLight2 dark:hover:bg-grayDark2">
                <Pen size={20} />
                <p>답변하기</p>
              </button>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-3 rounded-full hover:bg-grayLight2 dark:hover:bg-grayDark2 text-grayDark1 dark:text-grayBase">
                <Share />
              </button>
              <div className="relative">
                <button
                  onClick={() => toggleModal('more')}
                  className="p-3 rounded-full hover:bg-grayLight2 dark:hover:bg-grayDark2 text-grayDark1 dark:text-grayBase"
                >
                  <More />
                </button>
                {modal.has('more') && (
                  <MoreSelect
                    list={[
                      {
                        name:
                          userId === data.writer
                            ? '피드백 요청글 삭제'
                            : '글 신고',
                        onClick: () =>
                          userId === data.writer
                            ? deleteFeedback()
                            : toggleModal('more'),
                      },
                    ]}
                    click={() => toggleModal('more')}
                  />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};
