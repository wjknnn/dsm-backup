import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { FeedbackAnswerType } from '@/types'
import { relativeTime } from '@/utils'
import { createClient } from '@/utils/supabase/client'
import useMoonerDown from '@/utils/editor/hook/useMoonerDown'
import { Chat, Heart, HeartLine, More, Star } from '@/assets'
import { MoreSelect, useSelect } from '@/components'
import { FeedbackComment } from './FeedbackComment'
import { useQueryClient } from '@tanstack/react-query'
import { FeedbackQuery } from '@/modules/feedback'

export const Answer = ({
  answer,
  id,
  userId,
  writer,
}: {
  answer: FeedbackAnswerType
  id: string
  userId: string
  writer: string
}) => {
  const [showComment, setShowComment] = useState<boolean>(false)
  const [heart, setHeart] = useState<string[]>(answer.like)

  const router = useRouter()
  const supabase = createClient()
  const queryClient = useQueryClient()

  const { Result } = useMoonerDown(answer.content)
  const { modal, toggleModal } = useSelect<'share' | 'more'>()

  const commentCount = useMemo(
    () => answer.feedback_comment[0].count || 0,
    [answer]
  )

  const heartHandler = async () => {
    if (userId === '' && !alert('로그인 후 이용해 주세요.')!) {
      router.push('/login')
      return
    }
    const editedHeart = heart.includes(userId)
      ? heart.filter((value) => value !== userId)
      : [...heart, userId]

    setHeart(editedHeart)

    const { error } = await supabase
      .from('feedback_answer')
      .update({ like: editedHeart })
      .eq('id', answer.id)

    if (error) console.log(error)
  }

  const deleteAnswerHandler = async () => {
    if (!confirm('답변을 삭제하시면 복구할 수 없어요. 그래도 삭제하실 건가요?'))
      return
    const { error } = await supabase
      .from('feedback_answer')
      .delete()
      .eq('id', answer.id)

    if (error) console.log(error)
    else queryClient.refetchQueries({ queryKey: FeedbackQuery.answerList(id) })
  }

  const answerPick = async () => {
    const { error } = await supabase
      .from('feedback_answer')
      .update({ pick: true })
      .eq('id', answer.id)

    if (error) console.log(error)
    else queryClient.refetchQueries({ queryKey: FeedbackQuery.answerList(id) })
  }

  return (
    <article className='flex flex-col gap-7 p-8 rounded-[18px] border border-grayLight1 dark:border-grayDark2'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <Image
            src={answer.users.profile_image || '/images/DefaultProfile.png'}
            alt='profile image'
            width={80}
            height={80}
            className='object-cover bg-white border rounded-full cursor-pointer size-10 dark:bg-grayDark3 border-grayLight2 dark:border-grayDark2'
            priority
          />
          <div className='flex items-center gap-2 text-bodyLarge'>
            <p className='text-grayDark2 dark:text-grayLight1'>
              {answer.users.name}
            </p>
            <div className='rounded-sm size-1 bg-grayLight1 dark:bg-grayDark15'></div>
            <p className='text-grayDark1 dark:text-grayBase'>
              {answer.created_at && relativeTime(answer.created_at)}
            </p>
          </div>
        </div>
        <div className='flex gap-2'>
          {userId === answer.writer && (
            <div className='w-fit p-[6px_8px] text-bodyStrong rounded-lg bg-attentionBackground text-attention dark:bg-attention dark:bg-opacity-20'>
              <p className='dark:brightness-150 text-nowrap'>
                내가 남긴 피드백
              </p>
            </div>
          )}
          {answer.pick && (
            <div className='flex items-center gap-1 w-fit p-[6px_8px] text-bodyStrong rounded-lg bg-successBackground text-success dark:bg-success dark:bg-opacity-20'>
              <p className='dark:brightness-150 text-nowrap'>채택된 답변</p>
              <Star size={20} />
            </div>
          )}
        </div>
      </div>
      <div className='text-bodyLarge text-grayDark3 dark:text-grayLight2 m-[-12px]'>
        {Result}
      </div>
      <div className='flex justify-between'>
        <div className='flex gap-2'>
          <button
            onClick={heartHandler}
            className={`flex gap-2 items-center p-[11px_24px] h-12 rounded-full border text-bodyLarge ${
              heart.includes(userId)
                ? 'bg-criticalBackground bg-opacity-40 hover:bg-opacity-100 text-critical border-critical border-opacity-20 dark:bg-critical dark:bg-opacity-15 dark:hover:bg-opacity-20'
                : 'hover:bg-grayLight2 dark:hover:bg-grayDark2 text-grayDark15 dark:text-grayLight1 border-grayLight1 dark:border-grayDark15'
            }`}
          >
            {heart.includes(userId) ? (
              <Heart
                size={20}
                className='transition-none dark:brightness-150'
              />
            ) : (
              <HeartLine size={20} />
            )}
            {heart.length > 0 && (
              <p className='dark:brightness-150'>{heart.length}</p>
            )}
          </button>
          <button
            onClick={() => setShowComment((prev) => !prev)}
            className={`flex gap-2 items-center p-[11px_24px] h-12 rounded-full border text-bodyLarge hover:bg-grayLight2 dark:hover:bg-grayDark2 transition-none ${
              showComment
                ? 'text-black dark:text-white border-grayDark15 dark:border-grayBase'
                : 'text-grayDark15 dark:text-grayLight1 border-grayLight1 dark:border-grayDark15'
            }`}
          >
            <Chat size={20} />
            {commentCount > 0 && <p>{commentCount}</p>}
          </button>
        </div>
        <div className='flex items-center gap-2'>
          {userId === writer && !answer.pick && (
            <button
              onClick={answerPick}
              className='flex gap-2 items-center p-[11px_24px] h-12 rounded-full border text-bodyLarge hover:bg-attentionBackground dark:hover:bg-grayDark2 text-attention dark:text-white border-grayLight1 dark:border-grayDark15'
            >
              <Star size={20} />
              <p className='text-nowrap'>채택하기</p>
            </button>
          )}
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
                    name: userId === answer.writer ? '답변 삭제' : '답변 신고',
                    onClick: () =>
                      userId === answer.writer
                        ? deleteAnswerHandler()
                        : toggleModal('more'),
                  },
                ]}
                click={() => toggleModal('more')}
              />
            )}
          </div>
        </div>
      </div>
      {showComment && <FeedbackComment id={`${answer.id}`} answer />}
    </article>
  )
}
