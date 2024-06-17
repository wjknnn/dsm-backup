import { instance } from '@/apis/interceptor';
import { FeedbackAnswerListType } from '@/types';

export const getFeedbackAnswer = async (id: string) => {
  return await instance<FeedbackAnswerListType>({
    method: 'GET',
    url: `/feedback/${id}/answer`,
  }).then((response) => response.data);
};
