import { useState } from 'react'
import { useFeedbackAnswersQuery } from '@/modules/feedback'
import { userIdStore } from '@/store'
import { createClient } from '@/utils/supabase/client'
import useMoonerDown from '@/utils/editor/hook/useMoonerDown'
import { Pen } from '@/assets'
import { Button } from '@/components'
import { Answer } from './Answer'

export const FeedbackAnswer = ({
  id,
  writer,
}: {
  id: string
  writer: string
}) => {
  const [openAnswer, setOpenAnswer] = useState<boolean>(false)
  const [showMD, setShowMD] = useState<boolean>(false)
  const { data, refetch } = useFeedbackAnswersQuery(id)

  const { Editor, Result, texts, clear } = useMoonerDown()
  const { userId } = userIdStore()

  const answerHandler = () => {
    if (!userId && !alert('로그인 후 피드백을 작성해 보세요.')!) return
    setOpenAnswer(true)
  }

  const answerCheck = (): boolean => {
    const myAnswerCheck = data?.every((value) => value.writer !== userId)
    if (writer !== userId && myAnswerCheck) return true
    else return false
  }

  const registerAnswer = async () => {
    if (
      texts.trim().replaceAll('\n', '').replaceAll(' ', '').length < 10 &&
      !alert('10자 이상 입력해 주세요.')!
    )
      return

    const supabase = createClient()
    const { error } = await supabase
      .from('feedback_answer')
      .insert({ content: texts, feedback: id, writer: userId })
    if (error) console.log(error)
    else {
      setOpenAnswer(false)
      setShowMD(false)
      clear()
      refetch()
    }
  }

  return (
    <>
      {data && (
        <section className='flex flex-col gap-10'>
          {answerCheck() && (
            <div className='flex p-8 sm:p-4 justify-between items-center bg-grayLight2 dark:bg-grayDark2 border border-grayLight1 dark:border-grayDark15 rounded-[18px]'>
              <div className='flex items-center gap-4 sm:gap-3'>
                <div className='p-[14px] bg-white dark:bg-grayDark3 border rounded-full border-grayLight1 dark:border-grayDark15'>
                  <Pen />
                </div>
                <div className='flex flex-col gap-1 sm:gap-0'>
                  <p className='text-subtitle sm:text-bodyLarge2'>
                    {data && data.length > 0
                      ? '추가 정보를 제공해 보세요.'
                      : '아직 등록된 답변이 없어요'}
                  </p>
                  <p className='text-body2'>디자인 정보를 공유해 주세요.</p>
                </div>
              </div>
              <Button size='small' onClick={answerHandler}>
                답변하기
              </Button>
            </div>
          )}
          {openAnswer && (
            <section className='flex flex-col gap-4 p-8 rounded-[18px] border border-grayLight1 dark:border-grayDark2'>
              <div className='flex items-center justify-between'>
                <p className='text-subTitle'>피드백 작성</p>
                <Button kind='white' onClick={() => setShowMD((prev) => !prev)}>
                  마크다운 미리보기
                </Button>
              </div>
              <div className='flex flex-col gap-2'>
                {showMD && (
                  <div className='border rounded-lg border-grayLight1 dark:border-grayDark2 max-h-[400px] min-h-[400px] sm:max-h-[320px] sm:min-h-[320px] overflow-hidden sm:-order-1'>
                    {Result}
                  </div>
                )}
                <div className='flex flex-1 min-h-[400px] h-fit sm:min-h-[320px] overflow-hidden rounded-xl'>
                  {Editor(
                    '피드백 요청을 받고 싶은 부분, 궁금한 점 등에 대해서 마음껏 작성해 보세요..'
                  )}
                </div>
              </div>
              <div className='flex justify-end gap-2'>
                <Button
                  kind='gray'
                  onClick={() => {
                    if (
                      !confirm(
                        '피드백 작성을 그만두실 건가요? 작성중인 내용이 모두 지워져요.'
                      )
                    )
                      return
                    setOpenAnswer(false)
                    setShowMD(false)
                    clear()
                  }}
                >
                  취소
                </Button>
                <Button onClick={registerAnswer}>답변 등록</Button>
              </div>
            </section>
          )}
          {data.length > 0 && (
            <section className='flex flex-col gap-4'>
              <p className='text-title'>{data.length} 개 답변</p>
              {data.map((answer) => (
                <Answer
                  key={answer.id}
                  id={id}
                  answer={answer}
                  userId={userId}
                  writer={writer}
                />
              ))}
            </section>
          )}
        </section>
      )}
    </>
  )
}
