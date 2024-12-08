'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useFeedbackDelete, useFeedbackQuery } from '@/modules/feedback'
import { userIdStore } from '@/store/userId'
import { relativeTime, storeUserId } from '@/utils'
import useMoonerDown from '@/utils/editor/hook/useMoonerDown'
import { Chat, More, Share } from '@/assets'
import {
  FeedbackChip,
  FeedbackNotFound,
  FeedbackSkeleton,
  MoreSelect,
  useSelect,
} from '@/components'
import { FeedbackAnswer } from './FeedbackAnswer'
import { FeedbackComment } from './FeedbackComment'

export const FeedbackDetail = ({ id }: { id: string }) => {
  const [showComment, setShowComment] = useState<boolean>(false)

  const { userId, updateUserId } = userIdStore()
  const { modal, toggleModal } = useSelect<'share' | 'more'>()

  const { data: feedback, isLoading, error } = useFeedbackQuery(id)
  const { mutate: remove } = useFeedbackDelete(id)

  const { Result } = useMoonerDown(feedback?.content)

  const handleDeleteFeedback = () => {
    remove()
  }

  useEffect(() => {
    storeUserId(updateUserId)
  }, [])

  return (
    <section className='max-w-[800px] w-full flex flex-col gap-10'>
      {isLoading ? (
        <FeedbackSkeleton />
      ) : error?.response?.status === 404 ? (
        <FeedbackNotFound />
      ) : (
        feedback && (
          <>
            <div className='flex flex-col gap-4'>
              <FeedbackChip status={feedback.status} large />
              <h1 className='text-titleLarge'>{feedback.title}</h1>
              <div className='flex items-center gap-3'>
                <Image
                  src={
                    feedback.users.profile_image || '/images/DefaultProfile.png'
                  }
                  alt='profile image'
                  width={120}
                  height={120}
                  className='object-cover bg-white border rounded-full cursor-pointer size-10 dark:bg-grayDark3 border-grayLight2 dark:border-grayDark2'
                  priority
                />
                <div className='flex items-center gap-2 text-bodyLarge'>
                  <p className='text-grayDark2 dark:text-grayLight1'>
                    {feedback.users.name}
                  </p>
                  <div className='rounded-sm size-1 bg-grayLight1 dark:bg-grayDark15'></div>
                  <p className='text-grayDark1 dark:text-grayBase'>
                    조회수 {feedback.views}
                  </p>
                  <div className='rounded-sm size-1 bg-grayLight1 dark:bg-grayDark15'></div>
                  <p className='text-grayDark1 dark:text-grayBase'>
                    {feedback.created_at && relativeTime(feedback.created_at)}
                  </p>
                </div>
              </div>
            </div>
            <article className='pb-6'>
              <div className='text-bodyLarge text-grayDark3 dark:text-grayLight2 m-[-12px]'>
                {Result}
              </div>
            </article>
            {feedback.tags && (
              <div className='flex gap-[6px] pb-6 items-center flex-wrap'>
                {feedback.tags.map((tagName) => (
                  <button
                    key={tagName}
                    className='p-[8px_12px] rounded-full bg-grayLight2 dark:bg-grayDark2 text-bodyLarge text-grayDark15 dark:text-grayLight1 hover:bg-grayLight1 dark:hover:bg-grayDark15'
                  >
                    #{tagName}
                  </button>
                ))}
              </div>
            )}
            <div className='flex justify-between'>
              <div className='flex gap-2'>
                <button
                  onClick={() => setShowComment((prev) => !prev)}
                  className={`flex gap-2 items-center p-[11px_24px] h-12 rounded-full border text-bodyLarge hover:bg-grayLight2 dark:hover:bg-grayDark2 transition-none ${
                    showComment
                      ? 'text-black dark:text-white border-grayBase dark:border-grayBase'
                      : 'text-grayDark15 dark:text-grayLight1 border-grayLight1 dark:border-grayDark15'
                  }`}
                >
                  <Chat size={20} />
                  {feedback.feedback_comment > 0 && (
                    <p>{feedback.feedback_comment}</p>
                  )}
                </button>
              </div>
              <div className='flex items-center gap-1'>
                <button className='p-3 rounded-full hover:bg-grayLight2 dark:hover:bg-grayDark2 text-grayDark1 dark:text-grayBase'>
                  <Share />
                </button>
                <div className='relative'>
                  <button
                    onClick={() => toggleModal('more')}
                    className='p-3 rounded-full hover:bg-grayLight2 dark:hover:bg-grayDark2 text-grayDark1 dark:text-grayBase'
                  >
                    <More />
                  </button>
                  {modal.has('more') && (
                    <MoreSelect
                      list={[
                        {
                          name:
                            userId === feedback.writer
                              ? '피드백 요청글 삭제'
                              : '글 신고',
                          onClick: () =>
                            userId === feedback.writer
                              ? handleDeleteFeedback()
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
        )
      )}
      {showComment && <FeedbackComment id={id} />}
      <div className='h-[1px] w-full bg-grayLight2 dark:bg-grayDark2'></div>
      {feedback && <FeedbackAnswer id={id} writer={feedback?.writer || ''} />}
    </section>
  )
}
