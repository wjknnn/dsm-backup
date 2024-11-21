'use client'

import { deleteFeedback, getFeedback } from '@/apis'
import { Chat, More, Share } from '@/assets'
import {
  FeedbackChip,
  FeedbackSkeleton,
  MoreSelect,
  useSelect,
} from '@/components'
import { relativeTime, storeUserId } from '@/utils'
import useMoonerDown from '@/utils/editor/hook/useMoonerDown'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FeedbackAnswer } from './FeedbackAnswer'
import { useEffect, useState } from 'react'
import { FeedbackComment } from './FeedbackComment'
import { userIdStore } from '@/store/userId'
import { FeedbackQuery } from '@/modules/useFeedbackQuery'

export const FeedbackDetail = ({ id }: { id: string }) => {
  const [showComment, setShowComment] = useState<boolean>(false)
  const [commentCnt, setCommentCnt] = useState<number>(0)
  const router = useRouter()
  const { data, isLoading } = useQuery({
    queryKey: ['Feedback Detail', id],
    queryFn: () => getFeedback(id),
    staleTime: 60 * 1000 * 10,
  })

  const queryClient = useQueryClient()

  const { userId, updateUserId } = userIdStore()
  const { Result } = useMoonerDown(data?.content)
  const { modal, toggleModal } = useSelect<'share' | 'more'>()

  const deleteFeedbackHandler = async () => {
    await deleteFeedback(id)
      .then(() => {
        queryClient.refetchQueries({ queryKey: FeedbackQuery.feedbackList })
        router.replace('/feedback')
      })
      .catch((err) => alert(err))
  }

  useEffect(() => {
    setCommentCnt(data?.feedback_comment || 0)
  }, [id, data])

  useEffect(() => {
    storeUserId(updateUserId)
  }, [])

  return (
    <section className='max-w-[800px] w-full flex flex-col gap-10'>
      {isLoading ? (
        <FeedbackSkeleton />
      ) : (
        data && (
          <>
            <div className='flex flex-col gap-4'>
              <FeedbackChip status={data.status} large />
              <h1 className='text-titleLarge'>{data.title}</h1>
              <div className='flex items-center gap-3'>
                <Image
                  src={data.users.profile_image || '/images/DefaultProfile.png'}
                  alt='profile image'
                  width={120}
                  height={120}
                  className='object-cover bg-white border rounded-full cursor-pointer size-10 dark:bg-grayDark3 border-grayLight2 dark:border-grayDark2'
                  priority
                />
                <div className='flex items-center gap-2 text-bodyLarge'>
                  <p className='text-grayDark2 dark:text-grayLight1'>
                    {data.users.name}
                  </p>
                  <div className='rounded-sm size-1 bg-grayLight1 dark:bg-grayDark15'></div>
                  <p className='text-grayDark1 dark:text-grayBase'>
                    조회수 {data.views}
                  </p>
                  <div className='rounded-sm size-1 bg-grayLight1 dark:bg-grayDark15'></div>
                  <p className='text-grayDark1 dark:text-grayBase'>
                    {data.created_at && relativeTime(data.created_at)}
                  </p>
                </div>
              </div>
            </div>
            <article className='pb-6'>
              <div className='text-bodyLarge text-grayDark3 dark:text-grayLight2 m-[-12px]'>
                {Result}
              </div>
            </article>
            {data.tags && (
              <div className='flex gap-[6px] pb-6 items-center flex-wrap'>
                {data.tags.map((tagName) => (
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
                  {commentCnt > 0 && <p>{commentCnt}</p>}
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
                            userId === data.writer
                              ? '피드백 요청글 삭제'
                              : '글 신고',
                          onClick: () =>
                            userId === data.writer
                              ? deleteFeedbackHandler()
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
      {showComment && <FeedbackComment id={id} setCommentCnt={setCommentCnt} />}
      <div className='h-[1px] w-full bg-grayLight2 dark:bg-grayDark2'></div>
      <FeedbackAnswer id={id} writer={data?.writer || ''} />
    </section>
  )
}
