import { getFeedbackList } from '@/apis'
import { feedbackStore } from '@/store'
import { useQuery } from '@tanstack/react-query'

export const FeedbackQuery = {
  feedbackList: ['Feedback List'],
}

export const useFeedbackListQuery = () => {
  const { page, order, isList } = feedbackStore()
  return useQuery({
    queryKey: [...FeedbackQuery.feedbackList, page, order, isList],
    queryFn: () => getFeedbackList(page, order, isList ? 20 : 10),
    staleTime: 10 * 1000,
  })
}
