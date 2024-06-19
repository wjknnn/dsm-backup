import { instance } from '@/apis/interceptor';
import { FeedbackCommentListType } from '@/types';

export const getFeedbackComment = async (id: string, answer: boolean) => {
  return await instance<FeedbackCommentListType>({
    method: 'GET',
    url: `/feedback/${id}/comment`,
    params: { answer },
  }).then((respons) => respons.data);
};
