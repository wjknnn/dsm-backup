import { useRouter } from 'next/navigation'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  deleteFeedback,
  getFeedback,
  getFeedbackComment,
  getFeedbackList,
} from '@/apis'
import { FeedbackListType, FeedbackOrderType, FeedbackType } from '@/types'
import { feedbackStore } from '@/store'
import { AxiosError } from 'axios'

export const FeedbackQuery = {
  list: (page: number, order: FeedbackOrderType, isList: boolean) => [
    'Feedback List',
    page,
    order,
    isList,
  ],
  detail: (id: string) => ['Feedback Detail', id],
  delete: (id: string) => ['Feedback', 'Delete', id],
  comment: (id: string, answer: boolean) => ['feedback comment', id, answer],
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

export const useFeedbackCommentsQuery = (id: string, answer: boolean) => {
  return useQuery({
    queryKey: FeedbackQuery.comment(id, answer),
    queryFn: () => getFeedbackComment(id, answer),
    staleTime: 1000 * 10,
  })
}
