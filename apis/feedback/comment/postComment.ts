import { createClient } from '@/utils/supabase/client'

export const postComment = async (
  id: string,
  comment: string,
  userId: string,
  answerId?: string
) => {
  const supabase = createClient()

  const feedbackReq = { comment: comment, writer: userId, feedback: +id }
  const answerRe = {
    comment: comment,
    writer: userId,
    answer: +(answerId || 0),
  }
  const { data, error } = await supabase
    .from('feedback_comment')
    .insert(answerId ? answerRe : feedbackReq)

  if (error) Promise.reject(error)
  return data
}
