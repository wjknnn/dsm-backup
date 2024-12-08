import { useRouter } from 'next/navigation'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  deleteFeedback,
  getFeedback,
  getFeedbackAnswer,
  getFeedbackComment,
  getFeedbackList,
} from '@/apis'
import { FeedbackListType, FeedbackOrderType, FeedbackType } from '@/types'
import { feedbackStore } from '@/store'
import { AxiosError } from 'axios'
import { deleteComment } from '@/apis/feedback/comment/deleteComment'
import { postComment } from '@/apis/feedback/comment/postComment'

export const FeedbackQuery = {
  list: (page: number, order: FeedbackOrderType, isList: boolean) => [
    'Feedback',
    'List',
    page,
    order,
    isList,
  ],
  detail: (id: string) => ['Feedback', 'Detail', id],
  delete: (id: string) => ['Feedback', 'Delete', id],
  answerList: (id: string) => ['Feedback', 'Answer', 'List', id],
  commentList: (id: string, answer: boolean) => [
    'Feedback',
    'Comment',
    'List',
    id,
    answer,
  ],
  commentPost: (id: string) => ['Feedback', 'Comment', 'Post', id],
  commentDelete: (id: string) => ['Feedback', 'Comment', 'Delete', id],
}

export const useFeedbackListQuery = () => {
  const { page, order, isList } = feedbackStore()
  return useQuery<FeedbackListType, AxiosError>({
    queryKey: FeedbackQuery.list(page, order, isList),
    queryFn: () => getFeedbackList(page, order, isList ? 20 : 10),
    staleTime: 10 * 1000,
  })
}

export const useFeedbackQuery = (id: string) => {
  return useQuery<FeedbackType, AxiosError>({
    queryKey: FeedbackQuery.detail(id),
    queryFn: () => getFeedback(id),
    staleTime: 60 * 1000 * 10,
    retry: 1,
  })
}

export const useFeedbackDelete = (id: string) => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { page, order, isList } = feedbackStore()

  return useMutation({
    mutationKey: FeedbackQuery.delete(id),
    mutationFn: async () => await deleteFeedback(id),
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: FeedbackQuery.list(page, order, isList),
      })
      router.replace('/feedback')
    },
  })
}

export const useFeedbackAnswersQuery = (id: string) => {
  return useQuery({
    queryKey: FeedbackQuery.answerList(id),
    queryFn: () => getFeedbackAnswer(id),
  })
}

export const useFeedbackCommentsQuery = (id: string, answerId?: string) => {
  const targetId = answerId || id

  return useQuery({
    queryKey: FeedbackQuery.commentList(targetId, !!answerId),
    queryFn: () => getFeedbackComment(targetId, !!answerId),
    staleTime: 1000 * 10,
  })
}

export const useFeedbackCommentPost = (
  id: string,
  userId: string,
  answerId?: string
) => {
  const queryClient = useQueryClient()
  const targetId = answerId || id

  return useMutation({
    mutationKey: FeedbackQuery.commentPost(targetId),
    mutationFn: async (comment: string) =>
      await postComment(id, comment, userId, answerId),
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: FeedbackQuery.commentList(targetId, !!answerId),
      })
      if (answerId) {
        queryClient.refetchQueries({
          queryKey: FeedbackQuery.answerList(id),
        })
      } else queryClient.refetchQueries({ queryKey: FeedbackQuery.detail(id) })
    },
  })
}

export const useFeedbackCommentDelete = (id: string, answerId?: string) => {
  const queryClient = useQueryClient()
  const targetId = answerId || id

  return useMutation({
    mutationKey: FeedbackQuery.commentDelete(targetId),
    mutationFn: async (commentId: string) => await deleteComment(commentId),
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: FeedbackQuery.commentList(targetId, !!answerId),
      })
      if (answerId) {
        queryClient.refetchQueries({
          queryKey: FeedbackQuery.answerList(id),
        })
      } else queryClient.refetchQueries({ queryKey: FeedbackQuery.detail(id) })
    },
  })
}
