import { instance } from '@/apis/interceptor';
import { FeedbackCommentListType } from '@/types';

export const getFeedbackComment = async (id: string) => {
  return await instance<FeedbackCommentListType>({
    method: 'GET',
    url: `/feedback/${id}/comment`,
  }).then((respons) => respons.data);
};
